function Home() {
    return (
        <div>
            <h2>Welcome to Gobble - Wine Cellar Management</h2>
            <div className='wine'>
                <div className='metadata'>
                    <p>Gobble allows users to easily manage their wine collection(s). Users can create multiple collections and organize their wine in each. Planned features include:</p><br />

                    <ul style={{ paddingLeft: "25px" }}>
                        <li>Multi-User functionality</li>
                        <li>"Drink It!" feature to track bottles that have been consumed (vs. simply deleted from the cellar)</li>
                        <li>Tasting notes on bottles that have been consumed</li>
                        <li>Dynamic storage recommendations (i.e., open storage locations are automatically selected)</li>
                        <li>The ability to update bottles/collections, including storage locations, prices, etc.</li>
                        <li>And much more!</li>
                    </ul><br />

                    <p>Take a look around and enjoy!</p>
                </div>
            </div>
        </div>
    );
}

export default Home