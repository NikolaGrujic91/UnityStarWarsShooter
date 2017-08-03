var enemy : GameObject;
var enemy2 : GameObject;
var enemyBoss : GameObject;
private var terrain1 : GameObject;
private var terrain2 : GameObject;
private var terrain3 : GameObject;
var score : GameObject;
static var secondsBetween : float = 1.5;//seconds between spawning common enemies
var trackTimer : float;
var trackTimer2 : float;
var bossTimer : float = 60;

function Start () 
{
	Debug.Log("secondsBetween = " + secondsBetween);
	
	//hide cursor when starting level
	Cursor.visible = false;
	
	//used in level that have terrain as background
	if(Application.loadedLevel == 5)
	{		
			terrain1 = GameObject.Find("Terrain1");
			terrain2 = GameObject.Find("Terrain2");
			terrain3 = GameObject.Find("Terrain3");
	}
}

function Update () 
{
	bossTimer -= Time.deltaTime;

	trackTimer -= Time.deltaTime;
	if(trackTimer <= 0)
	{
		Instantiate(enemy, transform.position, enemy.transform.rotation);
		trackTimer = secondsBetween;
	}
	
	trackTimer2 -= Time.deltaTime;
	if(trackTimer2 <= 0)
	{
		Instantiate(enemy2, transform.position, enemy2.transform.rotation);
		trackTimer2 = secondsBetween * 2;
	}
	
		
	if(bossTimer <= 0)
	{
		if(Application.loadedLevel == 5)
		{
			enemyBoss.GetComponent.<TrenchMove>().enabled = false;
			terrain1.GetComponent.<TrenchMove>().enabled = false;
			terrain2.GetComponent.<TrenchMove>().enabled = false;
			terrain3.GetComponent.<TrenchMove>().enabled = false;
			
		}
	
		if(Application.loadedLevel == 3)
		{
			Instantiate(score,score.transform.position, score.transform.rotation);
		}
		else if(Application.loadedLevel == 2 || Application.loadedLevel == 4)//move rebbel frigate
		{
			if(enemyBoss.transform.position.z > 44)
				enemyBoss.transform.position.z -= 7 * Time.deltaTime;
			else if(enemyBoss.transform.position.z <= 44)
				enemyBoss.transform.position.z = 44;
		
		}
		else if(Application.loadedLevel == 1)//move imperial destroyer
		{
			if(enemyBoss.transform.position.x > 15)
				enemyBoss.transform.position.x -= 3 * Time.deltaTime;
			else if(enemyBoss.transform.position.x <= 15)
				enemyBoss.transform.position.x = 15;
				
			if(enemyBoss.transform.position.z > 54)
				enemyBoss.transform.position.z -= 3 * Time.deltaTime;
			else if(enemyBoss.transform.position.z <= 54)
				enemyBoss.transform.position.z = 54;
				
			if(enemyBoss.transform.position.y > 0)
				enemyBoss.transform.position.y -= 3 * Time.deltaTime;
			else if(enemyBoss.transform.position.y <= 0)
				enemyBoss.transform.position.y = 0;
		}
	}
}