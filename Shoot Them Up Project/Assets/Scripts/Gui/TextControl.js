var mainCamera : GameObject;

function Start()
{
	//read highscore on game start up
	GameObject.FindGameObjectWithTag("Highscore").GetComponent.<TextMesh>().text = "highscore : " + PlayerPrefs.GetInt("Player Score");
	
	Cursor.visible = true;
}


function OnMouseEnter()
{
	//change color of text
	GetComponent.<Renderer>().material.color = Color.red;

}

function OnMouseExit()
{
	//change color of text
	GetComponent.<Renderer>().material.color = Color.yellow;

}

function OnMouseUp()
{
	if(gameObject.tag == "Play")
	{
		mainCamera.transform.position.x = -190;
	}
	
	if(gameObject.tag == "Quit")
	{
		Application.Quit();
	}
	
	if(gameObject.tag == "Controls")
	{
		mainCamera.transform.position.x = -42;
	}
	
	if(gameObject.tag == "Difficulty")
	{
		mainCamera.transform.position.x = -92;
	}
	
	if(gameObject.tag == "About")
	{
		mainCamera.transform.position.x = 52;
	}
	
	if(gameObject.tag == "Back")
	{
		mainCamera.transform.position.x = 0;
	}
	
	if(gameObject.tag == "Ship1")
	{
		mainCamera.transform.position.x = -136;
		PlayerSpawner.playerNumber = 1;
	}
	
	if(gameObject.tag == "Ship2")
	{
		mainCamera.transform.position.x = -136;
		PlayerSpawner.playerNumber = 2;
	}
	
	if(gameObject.tag == "Ship3")
	{
		mainCamera.transform.position.x = -136;
		PlayerSpawner.playerNumber = 3;
	}
	
	if(gameObject.tag == "Ship4")
	{
		mainCamera.transform.position.x = -136;
		PlayerSpawner.playerNumber = 4;
	}
	
	if(gameObject.tag == "Ship5")
	{
		mainCamera.transform.position.x = -136;
		PlayerSpawner.playerNumber = 5;
	}		
	
	if(gameObject.tag == "Level1")
	{
		Application.LoadLevel(1);
	}
	
	if(gameObject.tag == "Level2")
	{
		Application.LoadLevel(2);
	}
	
	if(gameObject.tag == "Level3")
	{
		Application.LoadLevel(3);
	}
	
	if(gameObject.tag == "Level4")
	{
		Application.LoadLevel(4);
	}
	
	if(gameObject.tag == "Level5")
	{
		Application.LoadLevel(5);
	}
	
	//difficulty settings
	if(gameObject.tag == "Easy")
	{
		EnemySpawner.secondsBetween = 2.5;//enemy spawning rate
		EnemyBoss.secondsBetween = 3;//boss shooting rate
		GameObject.FindGameObjectWithTag("Current Difficulty").GetComponent.<TextMesh>().text = "current difficulty : easy";
	}
	
	if(gameObject.tag == "Normal")
	{
		EnemySpawner.secondsBetween = 1.5;
		EnemyBoss.secondsBetween = 2;
		GameObject.FindGameObjectWithTag("Current Difficulty").GetComponent.<TextMesh>().text = "current difficulty : normal";
	}
	
	if(gameObject.tag == "Hard")
	{
		EnemySpawner.secondsBetween = 1;
		EnemyBoss.secondsBetween = 2;
		GameObject.FindGameObjectWithTag("Current Difficulty").GetComponent.<TextMesh>().text = "current difficulty : hard";
	}
}