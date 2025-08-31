import imgUrl from '../../assets/hero.png';

export function BoxInnerPage() {
    return (
        <main className="min-page-height">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-5">
                        <strong className="d-inline-block mb-2 text-primary-emphasis">Container Small</strong>
                        <h1 className="display-2">box</h1>
                        <p className="card-text mb-5">perishable</p>
                    </div>
                    <img src={imgUrl} alt="Box thumbnail" className="col-12 col-lg-4 object-fit-contain" />
                </div>
            </div>
        </main>
    );
}