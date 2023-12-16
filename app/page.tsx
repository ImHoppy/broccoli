import Link from 'next/link';

const CreateCard = ({ link, title, description }: { link: string, title: string, description: string }) => {
	return (
		<Link
			href={link}
			className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
		>
			<h2 className={`mb-3 text-2xl font-semibold`}>
				{`${title} `}
				<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
					-&gt;
				</span>
			</h2>
			<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
				{description}
			</p>
		</Link>
	);
}
const RecipeCard = ({ id, name, image }: { name: string, id: number, image: string }) => {
	return (
		<Link
			href={`/recipe/${id}`}
			className="group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 relative w-64 h-64"
		>
			<h2 className={`absolute bottom-0 m-3 text-2xl font-semibold`}>
				{name}
			</h2>
			<img
				className='h-full w-full object-cover rounded-lg '
				src={image}
				alt={name}
			/>
		</Link>
	);
}

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="grid lg:grid-cols-2 gap-8 mb-16">
				<CreateCard
					link='/create'
					title='Create'
					description='Create a new recipe'
				/>
				<CreateCard
					link='/drafts'
					title='Drafts'
					description='List of drafts'
				/>
			</div>
			{/* List of recipes */}
			<div className="grid lg:grid-cols-3 gap-8">
				<RecipeCard name='Recipe 1' image={"https://i.imgur.com/tuReSuq.jpeg"} id={1} />
				<RecipeCard name='Recipe 2' image={"https://i.imgur.com/tuReSuq.jpeg"} id={2} />
				<RecipeCard name='Recipe 3' image={"https://i.imgur.com/tuReSuq.jpeg"} id={3} />
				<RecipeCard name='Recipe 4' image={"https://i.imgur.com/tuReSuq.jpeg"} id={4} />
			</div>
		</main>
	)
}
