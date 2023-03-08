import React, { useEffect, useRef, useState } from 'react';

export default function App() {
	// States
	const [commands, setCommands] = useState({});
	const [history, setHistory] = useState([]);
	const [value, setValue] = useState('');

	let prompt = '$ ';
	// refs
	const term = useRef(null);

	// Effects
	useEffect(() => {
		// let termRef = term.getDOMNode();
		console.log('This is wrong.');
		registerCommands();
		showWelcomeMsg();
		term.current.focus();
	}, []);

	// Helper functions
	const addHistory = (output) => {
		console.log(output);
		if (output === '$  clear') {
			console.log('first');
			setHistory([]);
			console.log(history);
		} else {
			let currentHistory = history;
			currentHistory.push(output);
			setHistory([...currentHistory]);
			console.log(history);
		}
	};

	const openLink = (link) => {
		return function () {
			window.open(link, '_blank');
		};
	};

	const clearHistory = () => {
		setHistory([]);
	};

	const clearInput = () => {
		term.current.value = '';
	};

	const handleInput = (e) => {
		if (e.key === 'Enter') {
			var input_text = term.current.value;
			console.log('---------------', input_text);
			var input_array = input_text.split(' ');
			var input = input_array[0];
			var arg = input_array[1];
			var command = commands[input];
			console.log(commands[input]);
			addHistory(prompt + ' ' + input_text);

			if (command === undefined) {
				addHistory('sh: command not found: ' + input);
			} else {
				command(arg);
			}
			clearInput();
		}
	};

	const handleClick = () => {
		term.current.focus();
	};

	// All the commands and corresponding functions.
	const registerCommands = () => {
		setCommands({
			clear: clearHistory,
			ls: listFiles,
			intro: showWelcomeMsg,
			help: showHelp,
			cat: catFile,
			source: openLink('https://www.github.com'),
			github: openLink('http://github.com/nikhilkarve'),
			portfolio: openLink('https://nikhilkarve.github.io/'),
			resume: openLink(
				'https://github.com/nikhilkarve/nikhil-resume/blob/main/Nikhil.pdf'
			),
		});
	};

	// ----------------------------------------------
	// Functions corresponding to different commands
	// ----------------------------------------------
	const listFiles = () => {
		addHistory('README.md');
	};

	const showWelcomeMsg = () => {
		addHistory(
			"Hello, I'm Nikhil Karve, a graduate student in the Computer Science department at Georgia State University."
		);
		addHistory('Type `help` to see what all commands are available');
	};

	const catFile = (arg) => {
		if (arg === 'README.md') {
			addHistory('#### WELCOME, WELCOME, WELCOME');
			addHistory(
				"A couple of days back, I was discussing with my friend about having a portfolio website. So I created a very basic site(which you can check out by typing command 'portfolio')." +
					'Later I thought of creating something different and fun and then I started working on this terminal emulator in React!'
			);
			addHistory('type `source` to view the source code.');
		} else {
			addHistory('cat:' + arg + ': No such file or directory.');
		}
	};

	const showHelp = () => {
		console.log('hello');
		addHistory('help - help text');
		addHistory('github - view my github profile');
		addHistory('source - browse the code for this page');
		addHistory('intro - print intro message');
		addHistory('portfolio - check out my portfolio site');
		addHistory('clear - clear screen');
		addHistory('cat - print contents of a file');
		addHistory('ls - list files');
		addHistory('resume - view my resume');
	};

	// const [test, setTest] = useState(2);
	// const testch = () => {
	// 	setTest(test + 1);
	// };
	return (
		<div className='input-area' onClick={handleClick}>
			{history.map((op, i) => {
				return <p key={i}>{op}</p>;
			})}
			<p>
				<span className='prompt'>{prompt}</span>
				<input type='text' ref={term} onKeyPress={handleInput} />
			</p>
		</div>
	);
}
