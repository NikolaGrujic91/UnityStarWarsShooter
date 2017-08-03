var xWing : GameObject;
var TIE : GameObject;
var milleniumFalcon : GameObject;
var slave1 : GameObject;
var snowSpeeder : GameObject;
static var player : GameObject;
static var playerNumber : int = 1;

function Start () 
{
	switch(playerNumber)
	{
		case 1:
			player = xWing;
			break;
		case 2:
			player = TIE;
			break;
		case 3:
			player = milleniumFalcon;
			break;
		case 4:
			player = slave1;
			break;
		case 5:
			player = snowSpeeder;
			break;
	}

	Instantiate(player, player.transform.position, player.transform.rotation);

}

