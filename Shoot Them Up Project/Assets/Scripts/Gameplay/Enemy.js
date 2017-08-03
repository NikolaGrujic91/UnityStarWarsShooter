var moveSpeed : float = 15;
var killZPosition : float = -20;
var horizontalRandom : float = 20;
var explosion : GameObject;
var bullet : GameObject;
var player : GameObject;
var bulletSpawn1 : Transform;
var bulletSpawn2 : Transform;
var secondsBetween : float = 2;//seconds between shots
var shootingTimer : float;
var explosionPosition : float = 0;//prevents ship from moving when hitted
private var randomDirectionTimer : float;//time to change direction
private var randomDirection : float;//random left or right
private var movementType : float;
private var playerPositionX : float;
private var enemyPositionX : float; 


var shotSound : AudioClip;
var explosionSound : AudioClip;
var engineSound : AudioClip;
var audio1 : AudioSource;
var audio2 : AudioSource;
var audio3 : AudioSource;

function Start () 
{
	//randomize spawning position of the enemy
	transform.position.x += Random.Range(horizontalRandom,-horizontalRandom);
	
	//randomize left or right
	randomDirection = Random.Range(0,2);
	
	//randomize type of movement
	movementType = Random.Range(0,3);
	Debug.Log("movementType:"+movementType);
	
	var aSources = GetComponents(AudioSource);
    audio1 = aSources[0];
    audio2 = aSources[1];
    audio3 = aSources[2];
    
    //player is needed so we can follow his position during game
	player = GameObject.FindGameObjectWithTag("Player");
	
	playerPositionX = player.transform.position.x;
	enemyPositionX = transform.position.x;
}

function Update () 
{		
	if(explosionPosition != 0)
		//lock enemy position when hit
		transform.position.z = explosionPosition;
	else
		//enemy moving forward in opposite direction
		transform.position.z -= moveSpeed * Time.deltaTime;
	
	//-------ENEMY MOVEMENT-------
	//if movement type is 0 no change in x coordinate, no need to write code
	if(movementType == 1)//enemy random left right movement
	{	
		randomDirectionTimer -= Time.deltaTime;
		if(randomDirectionTimer < 0)//change direction every 1-3 seconds
		{
			randomDirection = Random.Range(0,2);
			randomDirectionTimer = Random.Range(0,4);//random time of changing direction 1-3
		}
		else
		{
			if(randomDirection == 0)
				transform.position.x += 4 * Time.deltaTime;
			else 
				transform.position.x -= 4 * Time.deltaTime;
		}
	}
	else if(movementType == 2)//moving to player position at time of spawning
	{
		if(enemyPositionX >= playerPositionX)//enemy x coord bigger than player x coor in time of spawning
		{
			if(transform.position.x <= playerPositionX)//current position lower than player at start, maintain it
				transform.position.x = playerPositionX;
			else//move enemy to player coordinate
				transform.position.x -= 4 * Time.deltaTime;
		}
		else//enemyPositionX < plyerPositionX
		{ 
			if(transform.position.x >= playerPositionX)
					transform.position.x = playerPositionX;
			else//move enemy to player coordinate
				transform.position.x += 4 * Time.deltaTime;
		}
	}
		
	//---------------------------------
																												
	//enemy shooting bullets when timer ends
	shootingTimer -= Time.deltaTime;
	if(shootingTimer <= 0)
	{
		Instantiate(bullet,bulletSpawn1.position, bulletSpawn1.rotation);
		Instantiate(bullet,bulletSpawn2.position, bulletSpawn2.rotation);
		
		shootingTimer = secondsBetween;
		
		audio1.clip = shotSound;
		audio1.Play();
	}
	
	//destroy enemy after killZPosition
	if(transform.position.z <= killZPosition)
		Destroy(gameObject);
}

function OnTriggerEnter(other : Collider)
{
	//when bullet hits the enemy, destroy enemy,animate explosion
	if(other.tag == "Bullet" || other.tag == "Player" || other.tag == "Torpedo")
	{
		audio2.clip = explosionSound;
		audio2.Play();
	
		PlayerShip.points += 200;//change number of points
	
		//lock enemy position
		explosionPosition = transform.position.z;
	
		Instantiate(explosion,transform.position, transform.rotation);
		Destroy(gameObject,audio2.clip.length);//destroy enemy
	}

}