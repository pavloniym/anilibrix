precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_size;
varying vec2 v_tex_pos;

vec4 interp(const vec2 uv) {
  vec2 px = 1.0 / u_size;
  vec2 vc = (floor(uv * u_size)) * px;
  vec2 f = fract(uv * u_size);
  vec4 tl = texture2D(u_texture, vc);
  vec4 tr = texture2D(u_texture, vc + vec2(px.x, 0));
  vec4 bl = texture2D(u_texture, vc + vec2(0, px.y));
  vec4 br = texture2D(u_texture, vc + px);
  return mix(mix(tl, tr, f.x), mix(bl, br, f.x), f.y);
}

void main() {
  gl_FragColor = interp(1.0 - v_tex_pos);
  //gl_FragColor = texture2D(u_texture, 1.0 - v_tex_pos);
}
