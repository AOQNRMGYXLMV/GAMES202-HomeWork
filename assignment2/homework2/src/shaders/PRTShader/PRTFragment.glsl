#ifdef GL_ES
precision mediump float;
#endif

varying highp vec3 vColor;

#define PI 3.1415926535897

float gammaCorrect(float a) {
    float gamma = 2.2;
    return pow(a, 1./2.2);
}

void main(void) {
    gl_FragColor = vec4(vColor * 1.3 / PI, 1);
}
