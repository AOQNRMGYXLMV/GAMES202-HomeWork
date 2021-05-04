function getRotationPrecomputeL(precompute_L, rotationMatrix){
	rotationMatrix = mat4Matrix2mathMatrix(rotationMatrix);

	// const mat3 = computeSquareMatrix_3by3(rotationMatrix);
	// const mat5 = computeSquareMatrix_5by5(rotationMatrix);
	// const result = new Array(9);
	const result = [];
	for (let i = 0; i < 3; i++) {
		result.push(mat3.fromValues(0, 0, 0, 0, 0, 0, 0, 0, 0));
	}
	return result;

	// for (let channel = 0; channel < 3; channel++) {
	// 	result[0][channel] = precompute_L[0][channel];
	// 	let vec3 = [], vec5 = [];
	// 	for (let i = 1; i <= 3; i++) vec3.push(precompute_L[i][channel]);
	// 	vec3 = math.multiply(mat3, math.matrix(vec3)).toArray();
	// 	for (let i = 1; i <= 3; i++) result[i][channel] = vec3[i-1];

	// 	for (let i = 4; i <= 8; i++) vec5.push(precompute_L[i][channel]);
	// 	vec5 = math.multiply(mat5, math.matrix(vec5)).toArray();
	// 	for (let i = 4; i <= 8; i++) result[i][channel] = vec5[i-4];
	// }

	// console.log(result);
	return getMat3ValueFromRGB(result);
}

function computeSquareMatrix_3by3(rotationMatrix){ // 计算方阵SA(-1) 3*3 
	
	// 1、pick ni - {ni}
	let n1 = [1, 0, 0, 0]; let n2 = [0, 0, 1, 0]; let n3 = [0, 1, 0, 0];
	const normals = [n1, n2, n3];

	// 2、{P(ni)} - A  A_inverse
	let matA = [];
	for (const normal of normals) {
		matA.push(SHEval3(...normal).slice(1, 4));
	}
	matA = math.transpose(math.matrix(matA));
	const matA_inverse = math.inv(matA);

	// 3、用 R 旋转 ni - {R(ni)}
	// 4、R(ni) SH投影 - S
	let matS = [];
	for (const normal of normals) {
		const rotatedN = math.multiply(rotationMatrix, math.matrix(normal)).toArray();
		matS.push(SHEval3(...rotatedN).slice(1, 4));
	}
	matS = math.transpose(math.matrix(matS));

	// 5、S*A_inverse
	return math.multiply(matS, matA_inverse);
}

function computeSquareMatrix_5by5(rotationMatrix){ // 计算方阵SA(-1) 5*5
	
	// 1、pick ni - {ni}
	let k = 1 / math.sqrt(2);
	let n1 = [1, 0, 0, 0]; let n2 = [0, 0, 1, 0]; let n3 = [k, k, 0, 0]; 
	let n4 = [k, 0, k, 0]; let n5 = [0, k, k, 0];
	const normals = [n1, n2, n3, n4, n5];

	// 2、{P(ni)} - A  A_inverse
	let matA = [];
	for (const normal of normals) {
		matA.push(SHEval3(...normal).slice(4, 9));
	}
	matA = math.transpose(math.matrix(matA));
	const matA_inverse = math.inv(matA);

	// 3、用 R 旋转 ni - {R(ni)}
	// 4、R(ni) SH投影 - S
	let matS = [];
	for (const normal of normals) {
		const rotatedN = math.multiply(rotationMatrix, math.matrix(normal)).toArray();
		matS.push(SHEval3(...rotatedN).slice(4, 9));
	}
	matS = math.transpose(math.matrix(matS));

	// 5、S*A_inverse
	return math.multiply(matS, matA_inverse);
}

function mat4Matrix2mathMatrix(rotationMatrix){

	let mathMatrix = [];
	for(let i = 0; i < 4; i++){
		let r = [];
		for(let j = 0; j < 4; j++){
			r.push(rotationMatrix[i*4+j]);
		}
		mathMatrix.push(r);
	}
	return math.matrix(mathMatrix)

}

function getMat3ValueFromRGB(precomputeL){

    let colorMat3 = [];
    for(var i = 0; i<3; i++){
        colorMat3[i] = mat3.fromValues( precomputeL[0][i], precomputeL[1][i], precomputeL[2][i],
										precomputeL[3][i], precomputeL[4][i], precomputeL[5][i],
										precomputeL[6][i], precomputeL[7][i], precomputeL[8][i] ); 
	}
    return colorMat3;
}