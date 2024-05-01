const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const itemsPerRow = 3;

async function PageStart()
{
    var table = document.getElementById("gameTable");

    const requestOptions = {
        method: "GET",
        mode: "no-cors",
    } 

    var results = await fetch('http://localhost:8080/getGames', requestOptions);
    var games = await results.json();

    var row = null;

    let rowcount = 0;

    for (let i = 0; i < games.length; i++) 
    {
       games[i].game_release = new Date(Date.parse(games[i].game_release));
    }

    // sorting will be done server side when new entries are made
    // this is just temp for now
    games.sort((a, b) => 
    {
        if (a.game_release.getTime() > b.game_release.getTime()) { return -1; }
        else if (a.game_release.getTime() < b.game_release.getTime()) { return 1; }

        return 0;
    });

    let lastYear = 0;
    let currentRowCount = 0;

    for (let i = 0; i < games.length; i++) 
    {
        console.log(games[i].game_release);
        if(currentRowCount % itemsPerRow == 0 || games[i].game_release.getYear() != lastYear)
        {
            if(games[i].game_release.getYear() != lastYear)
            {
                lastYear = games[i].game_release.getYear();

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
        <h2 id = "${games[i].game_name}_Name">${games[i].game_name}</h2>
        <h5 id = "${games[i].game_name}_Date">${month[games[i].game_release.getMonth()] + " " + (games[i].game_release.getDate() + 1) + " " + (games[i].game_release.getYear() + 1900)}</h5>
        <div id = "${games[i].game_name}_Video"></div>
        <p id = "${games[i].game_name}_Desc">${games[i].game_description}</p>
        <p>Contibutors:</p>
        <p id = "${games[i].game_name}_Contributors">${games[i].game_contributors}</p>
        <button class = "OpenGameButton" id = "${games[i].game_name}_Link" onClick="window.open( '${games[i].game_link}', '_blank');">Game Link</button>
        <button class = "EditGameButton" id = "${games[i].game_name}_Edit" onClick="window.open( '../submit.html?id=${games[i].game_ID}', '_self');">Edit</button>
        `

        if(games[i].game_videoID != null && games[i].game_videoID.length > 0)
        {
            document.getElementById(games[i].game_name+"_Video").outerHTML = 
            `
            <div class="GameVideoContainer">
                <iframe class="GameVideo" src="https://www.youtube.com/embed/${games[i].game_videoID}?si=_FPzoRG42EeGD8_p" frameborder="0" picture-in-picture; web-share" allowfullscreen></iframe>
            </div> 
            `
        }

        gameElement.classList.add("GameHolder");
    }   
}

document.body.onload = PageStart;