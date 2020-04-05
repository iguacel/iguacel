uniform float time;
void main() {
   float z = 1.0 - (gl_FragCoord.z / gl_FragCoord.w) / 20.0;
   gl_FragColor = vec4(sin(time * 2.0) * z, cos(time) * z, atan(time) * z, 1.0);
}