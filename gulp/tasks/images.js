import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'

export const images = () => {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'IMAGES',
					message: 'Error: <%= error.message %>',
				}))
		)
		.pipe(app.plugins.newer(app.path.build.images)) //проверяем картинки в папке с результатом чтобы обрабатывать лишь те которые изменились либо  которых там нет
		.pipe(
            app.plugins.if(
                app.isBuild,
                webp() // создаем изображения веб-пи
            )
        )
		.pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images) //выгружаем их в папку с результатом
            )
        )
		.pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images) //
            )
        )
		.pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images) //опять получаем доступ к изображением в папке с исходниками и проверить на обновление
            )
        )
		.pipe(
            app.plugins.if(
                app.isBuild,
			imagemin({
				// задача которая будет сжимать изображения
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3, // 0 to 7 степень сжатия картинок
			})
            )
		)
		.pipe(app.gulp.dest(app.path.build.images)) // мы выгружаем оптимизированные картинки в папку с результатом
		.pipe(app.gulp.src(app.path.src.svg)) // получаем доступ к с-ви-джи изображениям в папке исходников
		.pipe(app.gulp.dest(app.path.build.images)) // и просто копируем их в папку с результатом
		.pipe(app.plugins.browsersync.stream()) // затем обновляем браузер
}
