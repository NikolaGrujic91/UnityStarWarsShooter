static var levelToLoad : int;
static var loadLevel : boolean;

function Start () {
	loadLevel = false;
}

function Update () 
{
	Application.LoadLevel(levelToLoad);
}