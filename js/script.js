/* global monogatari */

// Define the messages used in the game.
monogatari.action('message').messages({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
      <p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
      <p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
    `
	}
});

// Define the notifications used in the game
monogatari.action('notification').notifications({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action('particles').particles({

});

// Define the canvas objects used in the game
monogatari.action('canvas').objects({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets('gallery', {

});

// Define the music used in the game.
monogatari.assets('music', {

});

// Define the voice files used in the game.
monogatari.assets('voices', {

});

// Define the sounds used in the game.
monogatari.assets('sounds', {

});

// Define the videos used in the game.
monogatari.assets('videos', {

});

// Define the images used in the game.
monogatari.assets('images', {

});

// Define the backgrounds for each scene.
monogatari.assets('scenes', {
	'courtyard': 'courtyard.png',
	'library': 'library.png',
	'warroom': 'warroom.png',
	'owlery': 'owl.png',
	'tavern': 'tavern.png'
});


//Define the Characters
monogatari.characters({
	'y': {
		name: 'Yui',
		color: '#5bcaff'
	}
});

/* remember whether the intro has played */
monogatari.storage({ introSeen: false });


monogatari.script({

	/* ───────────────  COURTYARD ENTRY  ─────────────── */
	Start: [               /* every “Back” still jumps here */
		{
			Conditional: {
				Condition() { return this.storage('introSeen'); },
				True: 'jump StartMenu',
				False: 'jump StartIntro'
			}
		}
	],

	/* first-time flavour text */
	StartIntro: [
		'show scene courtyard with fadeIn',
		'centered A new traveller arrives…',
		'centered I am <strong>Ruben</strong>, scribe and code-smith.',
		{
			Function: {
				Apply() { this.storage({ introSeen: true }); return true; }
			}
		},
		'jump StartMenu'
	],

	/* menu you’ll revisit from everywhere */
	StartMenu: [
		'show scene courtyard with fadeIn',
		{
			Choice: {
				Projects: {
					Text: 'Unroll the scrolls of past works',
					Do: 'jump ProjectsIntro'
				},
				Resume: {
					Text: 'Consult the guild record of my craft',
					Do: 'jump ResumeIntro'
				},
				Contact: {
					Text: 'Dispatch a raven with your inquiry',
					Do: 'jump ContactIntro'
				},
				Tavern: {
					Text: 'Enter the tavern and speak with the code-smith',
					Do: 'jump TavernIntro'
				}
			}
		}
	],

	/* ───────────────  PROJECTS  ─────────────── */
	ProjectsIntro: [
		'show scene library with fadeIn',
		'centered Dusty tomes line the shelves. Which scroll shall I unroll?',
		'jump ProjectsMenu'
	],

	ProjectsMenu: [
		{
			Choice: {
				Project3: {
					Text: 'HitInfo Almanac · Flutter App on the Marketplace',
					onChosen() { window.open('https://play.google.com/store/apps/details?id=com.rubenbosma.hitinfo', '_blank', 'noopener'); },
					Do: 'jump ProjectsMenu'
				},
				Project4: {
					Text: 'Knight’s Path Controller · Third-Person in Unity C#',
					onChosen() { window.open('https://github.com/Ruben03x/unity-third-person-controller', '_blank', 'noopener'); },
					Do: 'jump ProjectsMenu'
				},
				Project5: {
					Text: 'Scrolls of Communication · Java Networking',
					onChosen() { window.open('https://github.com/Ruben03x?tab=repositories', '_blank', 'noopener'); },
					Do: 'jump ProjectsMenu'
				},
				Project6: {
					Text: 'Tiled Illusion Forge · Evolutionary Mosaic Builder',
					onChosen() { window.open('https://github.com/Ruben03x/evolutionary-algo-image-mosaic', '_blank', 'noopener'); },
					Do: 'jump ProjectsMenu'
				},
				Project7: {
					Text: 'Hybrid Flight Formations · PSO for Large-Scale Trials',
					onChosen() { window.open('https://github.com/Ruben03x/pso-lsops', '_blank', 'noopener'); },
					Do: 'jump ProjectsMenu'
				},
				Project8: {
					Text: 'Council of Guides · PSO Selection Strategy Trials',
					onChosen() { window.open('https://github.com/Ruben03x/pso-guide-selection', '_blank', 'noopener'); },
					Do: 'jump ProjectsMenu'
				},
				Back: {
					Text: '← Return to courtyard',
					Do: 'jump Start'
				}
			}
		}
	],


	/* ───────────────   RESUME  ─────────────── */
	ResumeIntro: [
		'show scene warroom with fadeIn',
		'centered Maps and ledgers spread across the oak table.',
		'jump ResumeMenu'
	],

	ResumeMenu: [
		{
			Choice: {
				DownloadResume: {
					Text: 'Download guild record (PDF)',
					onChosen() { window.open('RubenCV.pdf', '_blank', 'noopener'); },
					Do: 'jump ResumeMenu'
				},
				Back: { Text: '← Return to courtyard', Do: 'jump Start' }
			}
		}
	],

	/* ───────────────  CONTACT  ─────────────── */
	ContactIntro: [
		'show scene owlery with fadeIn',
		'centered A snow-white owl tilts its head, awaiting your scroll.',
		'jump ContactMenu'
	],

	ContactMenu: [
		{
			Choice: {
				Email: {
					Text: 'Send raven (e-mail)',
					onChosen() { window.open('mailto:ruben.bosma2003@gmail.com'); },
					Do: 'jump ContactMenu'
				},
				LinkedIn: {
					Text: 'Visit LinkedIn tower',
					onChosen() { window.open('https://www.linkedin.com/in/ruben-bosma/', '_blank', 'noopener'); },
					Do: 'jump ContactMenu'
				},
				Back: { Text: '← Return to courtyard', Do: 'jump Start' }
			}
		}
	],

	/* ───────────────  TAVERN — About Me  ─────────────── */
	TavernIntro: [
		{
			Function: {
				Apply() {
					const visited = this.storage('visited') || {};
					visited.tavern = true;
					this.storage({ visited });
					return true;
				}
			}
		},
		'show scene tavern with fadeIn',
		'centered The hearth crackles softly as you enter the tavern. Ruben sits by a scroll-laden table, ready to converse.',
		'jump TavernMenu'
	],

	TavernMenu: [
		{
			Choice: {
				TavernHobbies: {
					Text: 'Ask how the code-smith spends his time',
					Do: 'jump TavernHobbies'
				},
				TavernCurrent: {
					Text: 'Inquire about his current quest',
					Do: 'jump TavernCurrent'
				},
				TavernStory: {
					Text: 'Hear the tale of his beginnings',
					Do: 'jump TavernStory'
				},
				Back: {
					Text: '← Return to courtyard',
					Do: 'jump Start'
				}
			}
		}
	],

	TavernHobbies: [
		'centered \"When not buried in tomes of logic,\" Ruben muses, \"I delight in spending time with companions and kin. Be it laughter shared or quiet meals, they renew the spirit.\"',
		'jump TavernMenu'
	],

	TavernCurrent: [
		'centered \"At present,\" he says, gesturing to a parchment marked Honours Seal, \"I pursue my Honours in the arcane arts of Computer Science — a year of deep study and difficult trials.\"',
		'jump TavernMenu'
	],

	TavernStory: [
		'centered He leans forward. \"I’ve long been drawn to enchanted machines. I studied the basic runes of IT in high school, then pledged myself to the guild of Computer Science at university. Now, I seek to forge my future in cybersecurity, financial alchemy, or the realms of artificial minds.\"',
		'jump TavernMenu'
	],
});
