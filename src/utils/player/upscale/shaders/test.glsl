precision mediump float; // Обязательно ставим точность

varying vec2 vTextureCoord; // Здесь будет относительная (от 0.0 до 1.0) координата пикселя
uniform sampler2D uSampler; // Текстура, к которой применен шейдер.

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord); // получаем цвет пикселя

    if (color.a == 0.) { // если альфа-канал пуст
        gl_FragColor = vec4(.5, .5, .5, 1.); // красим в серый, пусто
    } else { // а если черный
        gl_FragColor = vec4(1., 0., 0., 1.); // красим в красный, препятствие
    }
}
