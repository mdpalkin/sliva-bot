import path from 'path'

export const CAKES = [
	{ 
		title: 'Бенто-торт с вашим дизайном (S) - 1960 ₽',
		description: path.resolve('static', 'bento-s', 'description.md'),
		images: [
			path.resolve('static', 'bento-s', 'bento-s-1.png'),
			path.resolve('static', 'bento-s', 'bento-s-2.png')
		] 
	},
	{ 
		title: 'Бенто-торт с вашим дизайном (M) - 2660 ₽',
		description: path.resolve('static', 'bento-m', 'description.md'),
		images: [
			path.resolve('static', 'bento-m', 'bento-m-1.png'),
			path.resolve('static', 'bento-m', 'bento-m-2.png'),
			path.resolve('static', 'bento-m', 'bento-m-3.png')
		]
	},
	{ 
		title: 'Детский торт «Хеллоу Китти» от 4000 ₽',
		description: path.resolve('static', 'hello-kitty', 'description.md'),
		images: [
			path.resolve('static', 'hello-kitty', 'hello-kitty-1.png'),
		]
	},
	{ 
		title: 'Торт "Чёрный Гелик» от 30 000 ₽',
		description: path.resolve('static', 'gelic', 'description.md'),
		images: [
			path.resolve('static', 'gelic', 'gelic-1.png'),
		]
	},
	{ 
		title: 'Свадебный Торт "Белая симфония» 6000 ₽',
		description: path.resolve('static', 'white-symphony', 'description.md'),
		images: [
			path.resolve('static', 'white-symphony', 'white-symphony-1.png'),
		]
	}
]

export const FILLINGS = [
	{ 
		title: 'Cникерс',
		description: path.resolve('static', 'fillings', 'snickers', 'description.md'),
		images: [
			path.resolve('static', 'fillings', 'snickers', 'snickers-1.png'),
		]
	},
	{ 
		title: 'Шоколадный',
		description: path.resolve('static', 'fillings', 'chocolate', 'description.md'),
		images: [
			path.resolve('static', 'fillings', 'chocolate', 'chocolate-1.png'),
		]
	},
	{ 
		title: 'Ягодный',
		description: path.resolve('static', 'fillings', 'berry', 'description.md'),
		images: [
			path.resolve('static', 'fillings', 'berry', 'berry-1.png'),
		]
	},
	{ 
		title: 'Фисташка - малина (+ 500 ₽ / 1 кг)',
		description: path.resolve('static', 'fillings', 'pistachio', 'description.md'),
		images: [
			path.resolve('static', 'fillings', 'pistachio', 'pistachio-1.png'),
		]
	},
	{ 
		title: 'Морковный (+ 350 ₽ / 1 кг)',
		description: path.resolve('static', 'fillings', 'carrot', 'description.md'),
		images: [
			path.resolve('static', 'fillings', 'carrot', 'carrot-1.png'),
		]
	},
	{ 
		title: 'Клубника-ваниль (+ 500 ₽ / 1 кг)',
		description: path.resolve('static', 'fillings', 'strawberry', 'description.md'),
		images: [
			path.resolve('static', 'fillings', 'strawberry', 'strawberry-1.png'),
		]
	},
	{ 
		title: 'Шоколадный с вишней (+ 650 ₽ / 1 кг)',
		description: path.resolve('static', 'fillings', 'cherry', 'description.md'),
		images: [
			path.resolve('static', 'fillings', 'cherry', 'cherry-1.png'),
		]
	},
]
