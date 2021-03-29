import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

const Characters = (props) => {
	const [data, setData] = useState([]);
	const [filtered, setFiltered] = useState();
	const [isHuman, setIsHuman] = useState(null);
	const [gender, setGender] = useState("");

	useEffect(() => {
		showList()
	}, [])

	useEffect(() => {
		let humanFilter = data.filter((item) => {
			return item.human === isHuman;
		})
		setFiltered(humanFilter)
	}, [isHuman])

	useEffect(() => {
		let genderFilter = data.filter((item) => {
			return item.gender === gender;
		})

		setFiltered(genderFilter)
	}, [gender])


	function showList() {
		axios.get('http://localhost:8080/characters')
			.then((response) => {
				setData(response.data)
				setFiltered(response.data);
			});
	}

	const editSearch = (e) => {
		let keywords = e.target.value.toLowerCase();
		if (keywords.length === 0) {
			setFiltered(data)
		} else {
			let filtered = data.filter((item) => {
				return item.call.toLowerCase().indexOf(keywords) > - 1;
			})
			setFiltered(filtered)
		}
	}

	return (
		<>
			{!props.location.cookie ?
				<Redirect to="/" />
				:
				<div id="main">
					<div id="header">
						<h1>Prince of Persia</h1>
						<h2>Characters</h2>
					</div>
					<h2>Filter by:</h2>
					<div id="filters">
						<span id="radios">
							<h3>Type:</h3>
							<label className="container">Humans:
								<input type="radio" name="human" id="humanFilter1" className="humanFilter" onChange={() => setIsHuman(true)} />
								<span className="checkmark"></span>
							</label>
							<label className="container">Others:
								<input type="radio" name="human" id="humanFilter1" className="humanFilter" onChange={() => setIsHuman(false)} />
								<span className="checkmark"></span>
							</label>
						</span>
						<span className="or">or</span>
						<span>
							<h3>Name:</h3>
							<input type="text" id="textFilter" onChange={(e) => editSearch(e)} />
						</span>
						<span className="or">or</span>
						<span>
							<h3>Gender:</h3>
							<select name="gender" id="genderFilter" onChange={(event) => setGender(parseInt(event.target.value))} value={gender} >
								<option value="" disabled>All</option>
								<option value="1">Male</option>
								<option value="2">Female</option>
								<option value="3">Other</option>
							</select>
						</span>
					</div>
					<div id="content">
						{filtered ?
							filtered.map((item, index) => (
								<Fade key={index} duration={1000} bottom>
									<div className="card" id={"card" + index} key={index}>
										<h2>{item.call}</h2>
										<div className="flexCard">
											{item.image.length === 1 ?
												<img className="charPic" src={`/img/${item.image}`} alt={item.call} />
												: <img className="charPic" src={`/img/${item.image[Math.floor(Math.random() * item.image.length)]}`} />
											}
											<div className="dataCont">
												<p><span className="propTitle">Name: </span>{item.name}</p>
												<p><span className="propTitle">Type: </span> {item.human === true ? "Human" : "Mystical Creature"}</p>
												<p><span className="propTitle">Gender: </span> {item.gender === 1 ? "Male" : item.gender === 2 ? "Female" : "Unknown"}</p>
												<p><span className="propTitle">Occupation: </span> {item.rank}</p>
												<p><span className="propTitle">Appearance: </span> {item.appear.length > 1 ? item.appear.join(", ")
													: item.appear[0]}
												</p>
											</div>
										</div>
									</div>
								</Fade>
							))
							: null}
					</div>

				</div>
			}
		</>
	)
}

export default Characters;
