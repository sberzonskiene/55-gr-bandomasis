import { PublicPageTitle } from '../../components/PublicPageTitle';
import { BoxCard } from '../../components/BoxCard';
import { useContext } from 'react';
import { BoxesContext } from '../../context/boxes/BoxesContext';

export function BoxesPage() {
    const { publicBoxes } = useContext(BoxesContext);

    return (
        <main className='min-page-height'>
            <PublicPageTitle title='Boxes' />

            <div className="container">
                <div className="row">
                    {publicBoxes.map((box, index) => <BoxCard key={index} box={box} />)}
                </div>
            </div>
        </main>
    );
}