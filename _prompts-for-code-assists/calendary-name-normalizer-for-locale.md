Calendar event names can come in this formats

- "Good News Youth - Молодежь Радостной Вести: Friday Nights - Встречи по Пятницам"
- "Christmas concert - Праздничный Рождественский концерт"
- "Christmas Eve - Сочельник"

where semicolon `:` is split between the group name and the event name, e.g. `groupName: eventName`, and `-` is split between English and Russian translation, e.g. `English name - Russian name`

we need to introduce event name locale normalizer helper function that would show english text only if the locale is the English one `en` (notice it is default one) and russian text if the locale is Russian. Also some kind of fallback mechanism if the such rendering is impossible
