import { PublicPageTitle } from '../../components/PublicPageTitle';
import { BoxCard } from '../../components/BoxCard';
import { useContext } from 'react';
import { ContainersContext } from '../../context/containers/ContainersContext';
import { useParams } from 'react-router';
import { BoxesContext } from '../../context/boxes/BoxesContext';

export function ContainerInnerPage() {
    const { publicContainers } = useContext(ContainersContext);
    const { publicBoxes } = useContext(BoxesContext);
    const { container } = useParams();

    const containerData = publicContainers.find(con => con.url_slug === container);

    if (!containerData) {
        return (
            <main className='min-page-height'>
                <PublicPageTitle title="Konteineris nerastas" />

                <div className="container">
                    <div className="row">
                        <p>Norimas konteineris "{container}" neegzistuoja.</p>
                    </div>
                </div>
            </main>
        );
    }

    const boxesData = publicBoxes.filter(b => b.container_id === containerData.id);

    return (
        <main className='min-page-height'>
            <PublicPageTitle title={containerData.title} />

            <div className="container">
                <div className="row">
                    {
                        boxesData.length
                            ? boxesData.map((box, index) => <BoxCard key={index} box={box} />)
                            : <div className='col-12 alert alert-warning'>Panašu, jog šiame konteineryje šiuo metu nėra jokių dėžių.</div>
                    }
                </div>
            </div>
        </main>
    );
}