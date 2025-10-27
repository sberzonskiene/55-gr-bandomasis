import { PublicPageTitle } from '../../components/PublicPageTitle';
import { ContainerCard } from '../../components/ContainerCard';
import { useContext } from 'react';
import { ContainersContext } from '../../context/containers/ContainersContext';

export function ContainersPage() {
    const { publicContainers } = useContext(ContainersContext);

    return (
        <main className='min-page-height'>
            <PublicPageTitle title='Containers' />

            <div className="container px-4" id="featured-3">
                <div className="row g-4 row-cols-1 row-cols-lg-3">
                    {publicContainers.map(container => <ContainerCard key={container.number} container={container} />)}
                </div>
            </div>
        </main>
    );
}