

function Update() 
{
	var loadPoints : int = PlayerPrefs.GetInt("Player Score");
	if(loadPoints > PlayerShip.points)
		GetComponent.<TextMesh>().text = "score : " + PlayerShip.points;	
	else
	{
		PlayerPrefs.SetInt("Player Score", PlayerShip.points);
		GetComponent.<TextMesh>().text = "new highscore : " + PlayerShip.points;
		PlayerPrefs.Save();	
	}
	
	GameObject.FindGameObjectWithTag("InGamePoints").GetComponent.<TextMesh>().text = "";
	GameObject.FindGameObjectWithTag("InGameTime").GetComponent.<TextMesh>().text = "";
	
	Invoke("NextMap", 8);//load next level after 5 seconds  
}



function NextMap() 
{ 
	//Application.LoadLevel(Application.loadedLevel + 1); //current level is 1
	Application.LoadLevel(0);
}