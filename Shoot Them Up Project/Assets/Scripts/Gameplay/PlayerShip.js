var playerSpeed : float = 10;
var maxWidth : float = 7.5;
var bullet : GameObject;
var torpedo : GameObject;
var health : GameObject; // health bar
var bulletSpawn1 : Transform;
var bulletSpawn2 : Transform;
var explosion : GameObject;
var restarter : GameObject;
var explosionPosition : float = 0;//prevents ship from moving when hitted
var loadPoints : float;
static var points : float = 0;//global points, can be changed from other scripts
var healthPlayer : float = 10;
var reloadTorpedo : float = 1.0;//torpedo firing rate
var torpedoTimer : float = 0.0;

var shotSound : AudioClip;
var torpedoSound : AudioClip;
var explosionSound : AudioClip;
var engineSound : AudioClip;
var audio1 : AudioSource;
var audio2 : AudioSource;
var audio3 : AudioSource;
var audio4 : AudioSource;

function Start ()
{
	//0 points at level start
	points = 0;

	//assign audio sources
	var aSources = GetComponents(AudioSource);//array of audio sources
    audio1 = aSources[0];
    audio2 = aSources[1];
    audio3 = aSources[2];
    audio4 = aSources[3];
    
    audio3.clip = engineSound;
    audio3.loop = true;
    audio3.Play();
    
    health = GameObject.Find("PlayerHealth");//get player health bar from scene
}

//happens every single frame
function Update ()
{
	//if player is hitted prevent from moving
	if(explosionPosition != 0)
		transform.position.z = explosionPosition;
	else
		//left and right move
		transform.position.x += Input.GetAxis("Horizontal") * playerSpeed * Time.deltaTime;
	
	//prevents ship from going of the screen
	if(transform.position.x > maxWidth)
		transform.position.x = maxWidth;
		
	if(transform.position.x < -maxWidth)
		transform.position.x = -maxWidth;
	
	//shoot bullet on space	
	if(Input.GetButtonDown("Jump"))
	{
		Instantiate(bullet,bulletSpawn1.position, bulletSpawn1.rotation);
		Instantiate(bullet,bulletSpawn2.position, bulletSpawn2.rotation);
		
		//play laser sound
		audio1.clip = shotSound;
		audio1.Play();		
	}
	
	//shoot proton torpedo on left ctrl
	if((Input.GetButtonDown("Fire1") || Input.GetButtonDown("Fire2")) && Time.time > torpedoTimer)
	{
		torpedoTimer = Time.time + reloadTorpedo;//torpedo delay
		Fire();				
	}
	
	if(PlayerSpawner.playerNumber == 3)
	{
		if(Input.GetButtonDown("LeanLeft"))
		{
			transform.Rotate(0.0f, 0.0f, -40.0f);
		}
		else if(Input.GetButtonUp("LeanLeft"))
			transform.Rotate(transform.forward, -40);
			
		if(Input.GetButtonDown("LeanRight"))
		{
			transform.Rotate(0.0f, 0.0f, 40.0f);
		}
		else if(Input.GetButtonUp("LeanRight"))
			transform.Rotate(transform.forward, 40);
	}
}

function OnTriggerEnter(other : Collider)
{
	//when enemy or bullet hits the player, destroy player,animate explosion
	if(other.tag == "Enemy")//if player collides with enemy -> destroy player
	{	
		audio2.clip = explosionSound;
		audio2.Play();
		
		//lock player position		
		explosionPosition = transform.position.z;
		
		//change health bar
		health.transform.localScale = new Vector3(0.0f , 0.0f , 0.0f );
		
		//show explosion
		Instantiate(explosion,transform.position, transform.rotation);
		//restart level
		Instantiate(restarter,transform.position, transform.rotation);
		
		//destroy object after audio clip is finished
		Destroy(gameObject,audio2.clip.length);
	}
	else if(other.tag == "EnemyBullet")//if player collides with enemy bullet -> lower health
	{
		audio2.clip = explosionSound;
		audio2.Play();
		
		//change health value
		healthPlayer--;
		
		//change health bar color
		if(healthPlayer <= 5)
			health.GetComponent.<Renderer>().material.color = Color.red;
			
		//change health bar
		health.transform.localScale += new Vector3(0.1f , 0.0f , 0.0f );

		//show explosion
		Instantiate(explosion,transform.position, transform.rotation);
		
		if(healthPlayer <= 0)
		{
			//change health bar
			health.transform.localScale = new Vector3(0.0f , 0.0f , 0.0f );
		
			//lock player position when destroyed		
			explosionPosition = transform.position.z;
		
			//restart level
			Instantiate(restarter,transform.position, transform.rotation);
		
			//destroy object after audio clip is finished
			Destroy(gameObject,audio2.clip.length);
		}
	}
}

function Fire()
{
	Instantiate(torpedo,bulletSpawn1.position, bulletSpawn1.rotation);
	Instantiate(torpedo,bulletSpawn2.position, bulletSpawn2.rotation);
		
	//play laser sound
	audio4.clip = torpedoSound;
	audio4.Play();
}