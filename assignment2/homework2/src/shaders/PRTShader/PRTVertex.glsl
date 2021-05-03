attribute vec3 aVertexPosition;
attribute mat3 aPrecomputeLT;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uSHColorR;
uniform mat3 uSHColorG;
uniform mat3 uSHColorB;

varying highp vec3 vColor;

void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

    vColor = vec3(0, 0, 0);
    float R = 0., G = 0., B = 0.;
    for (int i = 0; i < 3; i++) {
        R += dot(uSHColorR[i], aPrecomputeLT[i]);
        G += dot(uSHColorG[i], aPrecomputeLT[i]);
        B += dot(uSHColorB[i], aPrecomputeLT[i]);
    }
    vColor = vec3(R, G, B);
}
