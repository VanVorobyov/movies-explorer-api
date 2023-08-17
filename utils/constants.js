// eslint-disable-next-line no-useless-escape
module.exports.isURL = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

// Коды ошибок
module.exports.CREATED = 201;
module.exports.BAD_REQUEST = 400;
module.exports.NOT_FOUND = 404;
module.exports.INTERNAL_SERVER_ERROR = 500;
// Сообщения ошибок
module.exports.ROUTE_NOT_FOUND = 'Маршрут не найден';
// Для пользователя
module.exports.USER_NOT_FOUND = 'Пользователь с указанным _id не найден';
module.exports.AUTHORIZATION_REQUIRED = 'Необходима авторизация';
module.exports.EMAIL_ERROR = 'Неправильный формат почты';
module.exports.EMAIL_ALREADY_EXISTS = 'Пользователь с таким email уже существует';
module.exports.INCORRECT_DATA_CREATE_USER = 'Переданы некорректные данные при создании пользователя';
module.exports.INCORRECT_DATA_UPDATE_USER = 'Переданы некорректные данные при обновлении профиля';
module.exports.INCORRECT_EMAIL_OR_PASS = 'Неверно указана почта или пароль';
// Для фильмов
module.exports.MOVIE_NOT_FOUND = 'Запрашиваемая карточка фильма не найдена';
module.exports.URL_ERROR = 'Неправильный формат ссылки';
module.exports.INCORRECT_DATA_CREATE_MOVIE = 'Переданы некорректные данные при создании фильма';
module.exports.FORBIDDEN_DELETE_MOVIE = 'У Вас нет прав для совершения данного действия';
