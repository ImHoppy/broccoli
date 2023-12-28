const { db } = require('@vercel/postgres');

async function seedRecipes(client, dummy_data = false) {
	try {
		const createTable = await client.sql`
			CREATE TABLE IF NOT EXISTS recipes (
				id SERIAL DEFAULT PRIMARY KEY,
				title VARCHAR(255) NOT NULL,
				images VARCHAR(255),
				tags VARCHAR(255)[],
				ingredients VARCHAR(255)[],
				desc TEXT,
				rating integer,
				author VARCHAR(255),
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`;

		console.log(`Created "recipes" table`);

		if (!dummy_data) {
			return {
				createTable,
			};
		}
		const recipes = await Promise.all(
			[
				client.sql`
					INSERT INTO recipes (title, images, tags, ingredients, desc, rating, author)
					VALUES ('Pasta', '', '{"pasta", "italian"}', '{"250g pasta", "canned tomatoes", "cheese"}', '1. Cook pasta\n2. Add tomato sauce\n3. Add cheese\n4. Enjoy!', 4, 'John Doe')
				`,
				client.sql`
					INSERT INTO recipes (title, images, tags, ingredients, desc, rating, author)
					VALUES ('Pizza', '', '{"pizza", "italian"}', '{"pizza dough", "tomato base", "cheese"}', '1. Roll out dough\n2. Add tomato sauce\n3. Add cheese\n4. Bake for 20 minutes\n5. Enjoy!', 5, 'John Doe')
				`,
				client.sql`
					INSERT INTO recipes (title, images, tags, ingredients, desc, rating, author)
					VALUES ('Burger', '', '{"burger", "american"}', '{"buns", "patty", "cheese", "lettuce", "tomato"}', '1. Cook patty\n2. Add cheese\n3. Add lettuce and tomato\n4. Assemble burger\n5. Enjoy!', 3, 'John Doe')
				`,
				client.sql`
					INSERT INTO recipes (title, images, tags, ingredients, desc, rating, author)
					VALUES ('Chocolate Cake', '', '{"desert", "cake", "chocolate"}', '{"80g butter", "1 teaspoon of yeast", "60g of flour", "100g sugar", "150g of pastry chocolate", "3 eggs", "50g ground almonds"}','1. Mix ingredients\n2. Bake for 30 minutes\n3. Enjoy!', 5, 'John Doe')
				`,
			]
		);					

		console.log(`Seeded ${recipes.length} users`);

		return {
			createTable,
			recipes,
		};
	} catch (error) {
		console.error('Error seeding users:', error);
		throw error;
	}
}

async function main() {
	const client = await db.connect();

	await seedRecipes(client, false);

	await client.end();
}

main().catch((err) => {
	console.error(
		'An error occurred while attempting to seed the database:',
		err,
	);
});