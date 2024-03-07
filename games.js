const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const itemsPerRow = 3;

class game
{
    constructor(name, year, description, link, videoID, contributors) 
    {
        this.name = name;
        this.year = year;
        this.description = description
        this.link = link;
        this.videoID = videoID;
        this.contributors = contributors;
    }
}

const games = 
[
    new game
    (
        "Nightmare Arts", 
        new Date(2021, 8),
        "Nightmare Arts is an endless bullet hell where the player is equipped with a magic paint brush that they must use to slay hoards of demons.",
        "https://mundanepixel.itch.io/nightmare-arts",
        "qQSvTo840aM",
        [
            "Anthony Drapeau"
        ]
    ),
    new game
    (
        "SCOUT", 
        new Date(2023, 3),
        "S.C.O.U.T. is a rover piloting simulator set on an alien planet, filled with ancient and bizarre wonders waiting to be found. Explore the terrain, make your mark, and pass the torch onto the next pilot. Together, we go beyond!",
        "https://mundanepixel.itch.io/scout",
        "kfzYXPWK7W0",
        [
            "Seth Weeks",
            "M Mckeever",
            "Jihad Byant",
            "Ethan Laptew",
            "Joshua Peters",
            "Danny Gervino",
            "Alex Gickler",
            "John Green",
            "Miles Rogers",
            "Charlie O'Shaughnessy",
            "Adam Garwacki",
            "Alex Koeberl",
            "Lance Marshall",
            "Thomas Revord",
            "Charlie Polonus",
            "Joseph Consoli",
            "Anthony Drapeau",
            "Lucas Johnson",
            "Zayden Joyner",
            "Nick Junkas",
            "Jackson Laumann"
        ]
    ),
    new game
    (
        "Nowhere, Here, Then, and Now", 
        new Date(2023, 5),
        "NHTN is a survival horror game about exploring different liminal environments while having to manage your thirst, hunger, and sanity.",
        "https://creaturebox.itch.io/nowhere-here-then-and-now",
        "AsDFLUE2aJQ",
        [
            "Anthony Drapeau",
            "Nick Junkas"
        ]
    ),
    new game
    (
        "Sunrise", 
        new Date(2022, 9),
        "Freeform Larp/RPG about vampires waiting for the sunrise and accepting their death.",
        "https://mundanepixel.itch.io/sunrise",
        "",
        [
            "Anthony Drapeau"
        ]
    ),
    new game
    (
        "Beyond", 
        new Date(2021, 8),
        "Beyond is a platformer where the player needs to shift the world around them to progress through levels.",
        "https://mundanepixel.itch.io/beyond",
        "JmveDvFYC7w",
        [
            "Anthony Drapeau"
        ]
    ),
    new game
    (
        "Kubler Ct.", 
        new Date(2022, 11),
        "Kubler Ct. is a horror game about exploring a dream-like cul-de-sac trying to find your way out. You have the ability to use the blueprints of these houses to move objects and protect yourself.",
        "https://mundanepixel.itch.io/kublerct",
        "uKJWoda0Jpw",
        [
            "M McKeever",
            "Justin Clemens",
            "Anthony Drapeau",
            "Casey Vande Hey",
            "Alex Gruber"
        ]
    ),
    new game
    (
        "2 Birds 1 Bullet", 
        new Date(2023, 3),
        "2 Birds 1 Bullet is a puzzle FPS where the player is equipped with an arsenal of different bullets that they need to assassinate two different targets. The game focuses on player choice with 8 unique ways to kill each target.",
        "https://mundanepixel.itch.io/two-birds-one-bullet",
        "L9CQH7pPPMU",
        [
            "Quin Cheek",
            "Tyler Colander",
            "Jason Czech",
            "Anthony Drapeau",
            "Samuel Dwyer",
            "Nicholas Junkas",
            "Austin Schillage",
            "Kadin White",
        ]
    ),
]

function PageStart()
{
    var table = document.getElementById("gameTable");

    var row = null;

    let rowcount = 0;

    // sorting will be done server side when new entries are made
    // this is just temp for now
    games.sort((a, b) => 
    {
        if (a.year.getTime() > b.year.getTime()) { return -1; }
        else if (a.year.getTime() < b.year.getTime()) { return 1; }

        return 0;
    });

    let lastYear = 0;
    let currentRowCount = 0;

    for (let i = 0; i < games.length; i++) 
    {
        if(currentRowCount % itemsPerRow == 0 || games[i].year.getYear() != lastYear)
        {
            if(games[i].year.getYear() != lastYear)
            {
                lastYear = games[i].year.getYear();

                row = table.insertRow(rowcount);
                titleRow = row.insertCell(0);

                titleRow.outerHTML = 
                `
                    <td class = "YearHeader" colspan = ${itemsPerRow}>
                        <h2>
                            ${lastYear + 1900}
                        </h2>               
                    </td>
                `
                
                rowcount++;
            }
            
            row = table.insertRow(rowcount);
            currentRowCount = 0;
            rowcount++;
        }

        gameElement = row.insertCell(currentRowCount % itemsPerRow);
        currentRowCount++;

        gameElement.innerHTML =
        `
        <h2 id = "${games[i].name}_Name">${games[i].name}</h2>
        <h5 id = "${games[i].name}_Date">${month[games[i].year.getMonth()] + " " + (games[i].year.getYear() + 1900)}</h5>
        <div id = "${games[i].name}_Video"></div>
        <p id = "${games[i].name}_Desc">${games[i].description}</p>
        <p>Contibutors:</p>
        <p id = "${games[i].name}_Contributors">${games[i].contributors.join(', ')}</p>
        <button class = "OpenGameButton" id = "${games[i].name}_Link" onClick="window.open( '${games[i].link}', '_blank');">Game Link</button>
        `

        if(games[i].videoID != null && games[i].videoID.length > 0)
        {
            document.getElementById(games[i].name+"_Video").outerHTML = 
            `
            <div class="GameVideoContainer">
                <iframe class="GameVideo" src="https://www.youtube.com/embed/${games[i].videoID}?si=_FPzoRG42EeGD8_p" frameborder="0" picture-in-picture; web-share" allowfullscreen></iframe>
            </div> 
            `
        }

        gameElement.classList.add("GameHolder");
    }   
}

document.body.onload = PageStart;