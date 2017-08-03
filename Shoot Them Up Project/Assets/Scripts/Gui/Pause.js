var isPause = false;
var skin : GUISkin;
var player : GameObject;

var MainMenu : Rect = Rect(500, 10, 400, 400);
    
function Update () {
 if( Input.GetKeyDown(KeyCode.Escape))
   {
      isPause = !isPause;
      if(isPause)
      {
         Time.timeScale = 0;
         Cursor.visible = true;
         player.GetComponent.<PlayerShip>().enabled = false;
      }
      else
      {
         Time.timeScale = 1;
         Cursor.visible = false;
         player.GetComponent.<PlayerShip>().enabled = true;
      }
   }
}
 
function OnGUI()
{
	//disable player when in pause
	player = GameObject.FindGameObjectWithTag("Player");

	GUI.skin = skin;

   if(isPause)
       GUI.Window(0, MainMenu, TheMainMenu, "");
}
 
function TheMainMenu () 
{
	if(GUILayout.Button("resume"))
	{
		isPause = false;
		Time.timeScale = 1;
        Cursor.visible = false;
        player.GetComponent.<PlayerShip>().enabled = true;
	}

	if(GUILayout.Button("main menu"))
	{
		Time.timeScale = 1;//prevents from freezing when returning to game
		Application.LoadLevel(0);
	}
	if(GUILayout.Button("restart"))
	{
		Time.timeScale = 1;//prevents from freezing when returning to game
		Application.LoadLevel(Application.loadedLevel);
	}
}