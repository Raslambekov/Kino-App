import browsersync from 'browser-sync' // Локальный сервер
import newer from 'gulp-newer' //проверка обновлений
import notify from 'gulp-notify' // Сообщения (подсказки)
import plumber from 'gulp-plumber' // Обработка ошибок
import replace from 'gulp-replace' // Поиск и замена
import ifPlugin from "gulp-if"; // Условное ветвление 

// Экспортируем объект
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
    if: ifPlugin
}
