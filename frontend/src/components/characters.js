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
		let humanFilter = data;
		if (filtered && isHuman !== null && gender !== "") {
			humanFilter = humanFilter.filter((fil, index) => {
				return (
					fil.human === isHuman && fil.call.toLowerCase().includes(document.getElementById("textFilter").value.toLowerCase()) && fil.gender === gender
				);
			});
			setFiltered(humanFilter)
		} else if (filtered && isHuman !== null) {
			humanFilter = humanFilter.filter((fil, index) => {
				return (
					fil.human === isHuman && fil.call.toLowerCase().includes(document.getElementById("textFilter").value.toLowerCase())
				);
			});
			setFiltered(humanFilter);
		} else if (gender !== "" && isHuman !== null) {
			humanFilter = humanFilter.filter((fil, index) => {
				return (
					fil.human === isHuman && fil.gender === gender
				);
			});
			setFiltered(humanFilter);
		} else if (isHuman !== null) {
			humanFilter = humanFilter.filter((item) => {
				return item.human === isHuman;
			})
			setFiltered(humanFilter);
		}

	}, [isHuman])

	useEffect(() => {
		let genderFilter = data;
		if (filtered && isHuman !== null && gender !== "") {
			genderFilter = genderFilter.filter((fil, index) => {
				return (
					fil.human === isHuman && fil.call.toLowerCase().includes(document.getElementById("textFilter").value.toLowerCase()) && fil.gender === gender
				);
			});
			setFiltered(genderFilter)
		} else if (filtered && gender !== "") {
			genderFilter = genderFilter.filter((fil, index) => {
				return (
					fil.gender === gender && fil.call.toLowerCase().includes(document.getElementById("textFilter").value.toLowerCase())
				);
			});
			setFiltered(genderFilter);
		} else if (isHuman !== null && gender !== "") {
			genderFilter = genderFilter.filter((fil, index) => {
				return (
					fil.gender === gender && fil.human === isHuman
				);
			});
			setFiltered(genderFilter);
		} else if (gender !== "") {
			genderFilter = genderFilter.filter((item) => {
				return item.gender === gender;
			})
			setFiltered(genderFilter);
		}
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
		let filtered = data;

		if (keywords.length !== 0 && isHuman !== null && gender !== "") {
			filtered = filtered.filter((item) => {
				return (
					item.human === isHuman && item.call.toLowerCase().includes(keywords) && item.gender === gender
				);
			})
			setFiltered(filtered)
		} else if (keywords.length !== 0 && isHuman !== null) {
			filtered = filtered.filter((item) => {
				return (
					item.human === isHuman && item.call.toLowerCase().includes(keywords)
				);
			})
			setFiltered(filtered)
		} else if (keywords.length !== 0 && gender !== "") {
			filtered = filtered.filter((item) => {
				return (
					item.gender === gender && item.call.toLowerCase().includes(keywords)
				);
			})
			setFiltered(filtered)
		} else if (keywords.length !== 0) {
			filtered = filtered.filter((item) => {
				return item.call.toLowerCase().indexOf(keywords) > - 1;
			})
			setFiltered(filtered)
		} else if (keywords.length === 0 && gender !== "" && isHuman !== null) {
			filtered = filtered.filter(fil => {
				return (
					fil.gender === gender && fil.human === isHuman
				);
			});
			setFiltered(filtered);
		} else if (keywords.length === 0 && gender !== "") {
			filtered = filtered.filter(fil => {
				return (
					fil.gender === gender
				);
			});
			setFiltered(filtered);
		} else if (keywords.length === 0 && isHuman !== null) {
			filtered = filtered.filter(fil => {
				return (
					fil.human === isHuman
				);
			});
			setFiltered(filtered);
		} else if (keywords.length === 0 && isHuman == null && gender === "") {
			setFiltered(filtered);
		}
	}

	const resetAll = () => {
		let radios = document.querySelectorAll(".humanFilter")
		for (let i = 0; i < radios.length; i++) {
			radios[i].checked = false;
		}
		setIsHuman(null);

		document.getElementById("textFilter").value = "";
		setFiltered(data)

		document.getElementById("genderFilter").value = "";
		setGender("");
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
						<span>
							<h3>Name:</h3>
							<input type="text" id="textFilter" onChange={(e) => editSearch(e)} />
						</span>
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
					<div id="resetCont">
						<button id="resetBtn" onClick={resetAll}>Reset all filter</button>
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
