class PRTMaterial extends Material {
    constructor(colorMat, vertexShader, fragmentShader) {
        super ({
            'uSHColorR': { type: 'matrix3fv', value: colorMat[0] },
            'uSHColorG': { type: 'matrix3fv', value: colorMat[1] },
            'uSHColorB': { type: 'matrix3fv', value: colorMat[2] },
        }, ['aPrecomputeLT'], vertexShader, fragmentShader, null);
    }
}

async function buildPRTMaterial(colorMat, vertexShaderPath, fragmentShaderPath) {
    const vertexShader = await getShaderString(vertexShaderPath);
    const fragmentShader = await getShaderString(fragmentShaderPath);

    return new PRTMaterial(colorMat, vertexShader, fragmentShader);
}

