import React from "react";

import "./styles.css";
import logo from "./images/logo.png";

import CharacterCard from "./components/CharacterCard";
import Loading from "./components/Loading";

class App extends React.Component {
	state = {
		loading: true,
		error: null,
		data: {
			info: {},
			results: [],
		},
		nextPage: 1,
	};

	componentDidMount() {
		this.fetchCharacters();
	}

	fetchCharacters = async () => {
		this.setState({ loading: true, error: null });

		try {
			const response = await fetch(
				`https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
			);
			const data = await response.json();

			this.setState({
				loading: false,
				data: {
					info: data.info,
					results: [].concat(this.state.data.results, data.results),
				},
				nextPage: this.state.nextPage + 1,
			});
		} catch (error) {
			this.setState({ loading: false, error: error });
		}
	};

	render() {
		if (this.state.error) {
			return `Error: ${this.state.error.message}`;
		}

		return (
			<div className="container">
				<div className="App">
					<img className="Logo" src={logo} alt="Rick y Morty" />

					<ul className="row">
						{this.state.data.results.map((character) => (
							<li className="col-6 col-md-3" key={character.id}>
								<CharacterCard character={character} />
							</li>
						))}
					</ul>

					{this.state.loading && <Loading />}

					{!this.state.loading && this.state.data.info.next && (
						<button onClick={() => this.fetchCharacters()}>Load More</button>
					)}
				</div>
			</div>
		);
	}
}

export default App;
