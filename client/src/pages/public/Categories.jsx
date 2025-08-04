import { PublicPageTitle } from '../../components/PublicPageTitle';
import { CategoryCard } from '../../components/CategoryCard';

export function CategoriesPage() {
    const categoriesData = [
        {
            title: 'Action',
            description: 'The action genre features fast-paced, thrilling, and intense sequences of physical feats, combat, and excitement. The characters of these stories are involved in daring and often dangerous situations, requiring them to rely on their physical prowess, skills, and quick thinking to overcome challenges and adversaries.',
            moviesCount: 7,
            urlSlug: 'action',
        },
        {
            title: 'Crime',
            description: 'The crime genre features criminal activities, investigations, law enforcement, crimes, and the pursuit of justice. Crime stories often revolve around the planning, execution, and consequences of criminal acts, as well as the efforts to solve and prevent such acts.',
            moviesCount: 4,
            urlSlug: 'crime',
        },
        {
            title: 'Animation',
            description: 'Animation is a form of visual storytelling that involves creating visual art and motion through the use of various techniques and technologies. In animation, images are manipulated to create the illusion of movement, bringing characters, objects, and environments to life. ',
            moviesCount: 2,
            urlSlug: 'animation',
        },
    ];

    return (
        <main className='min-page-height'>
            <PublicPageTitle title='Categories' />

            <div className="container px-4" id="featured-3">
                <div className="row g-4 row-cols-1 row-cols-lg-3">
                    {categoriesData.map(category => <CategoryCard key={category.title} category={category} />)}
                </div>
            </div>
        </main>
    );
}