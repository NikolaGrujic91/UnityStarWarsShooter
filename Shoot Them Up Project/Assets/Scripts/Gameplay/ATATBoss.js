﻿var rotSpeed: float = 10; // rotation speed in degrees/second
var angle : float = 20.0f;
var left : boolean = true;
var explosion : GameObject;
var bullet : GameObject;
var flame : GameObject;
var player : GameObject;//used to disable player script on finishing level
var score : GameObject;
var healthBar : GameObject;
var shieldBar : GameObject;
var shieldEffect : GameObject;
var bulletSpawn1 : Transform;
var bulletSpawn2 : Transform;
static var secondsBetween : float = 2;//seconds between shots
var shootingTimer : float;
var bossTimer1 : float = 60;
var shootingWaveTimer : float = 10;
var startWave : boolean = true;
var moveBulletSpawn : float = 0;
var hitsToDestroyBoss : float = 40;
var hitsToDestroyShield : float = 40;

var shotSound1 : AudioClip;
var shotSound2 : AudioClip;
var shotSound3 : AudioClip;
var shotSound4 : AudioClip;
var explosionSound : AudioClip;
var engineSound : AudioClip;
var audio1 : AudioSource;
var audio2 : AudioSource;
var audio3 : AudioSource;
var audio4 : AudioSource;
var audio5 : AudioSource;
var audio6 : AudioSource;

function Start () 
{
	healthBar.GetComponent.<Renderer>().enabled = false;
	shieldBar.GetComponent.<Renderer>().enabled = false;
	
	player = GameObject.FindGameObjectWithTag("Player");	
				
	var aSources = GetComponents(AudioSource);
    audio1 = aSources[0];
    audio2 = aSources[1];
    audio3 = aSources[2];
    audio4 = aSources[3];
    audio5 = aSources[4];
    audio6 = aSources[5];
    
    audio5.clip = engineSound;
    audio5.loop = true;
    audio5.Play();
}

function Update () 
{
	//Debug.Log("HEALTH:"+hitsToDestroyBoss+" SHIELD:"+hitsToDestroyShield);
	bossTimer1 -= Time.deltaTime;
	if(bossTimer1 < 0 && hitsToDestroyBoss > 0)//shoot bullets when boss time comes and boss health is bigger than 0
	{
		healthBar.GetComponent.<Renderer>().enabled = true;
		shieldBar.GetComponent.<Renderer>().enabled = true;
	
		//boss shotting lasers in waves of 20 seconds every 20 seconds
		shootingWaveTimer -= Time.deltaTime;
		//Debug.Log(shootingWaveTimer + " " + startWave);
		if(shootingWaveTimer <= 0 && startWave == false)
		{
			shootingWaveTimer = 10;
			startWave = true;
		}
		else if(shootingWaveTimer <= 0 && startWave == true)
		{
			shootingWaveTimer = 10;
			startWave = false;
		}
		
		//Start lasers wave
		if(startWave == true)
		{
				//AT-AT HEAD MOVEMENT
				if(transform.rotation.y >= 0.17)
						left = false;
				else if(transform.rotation.y <= -0.17)
						left = true;
	
				if(left == true)
					transform.Rotate(0.0, rotSpeed*Time.deltaTime, 0.0);
				else
					transform.Rotate(0.0, -rotSpeed*Time.deltaTime, 0.0);
		
				//enemy shooting bullets when timer ends
				shootingTimer -= Time.deltaTime;
				if(shootingTimer <= 0)
				{ 
					Instantiate(bullet,bulletSpawn1.position, bulletSpawn1.rotation);
					audio1.clip = shotSound1;
					audio1.Play();
					
					Instantiate(bullet,bulletSpawn2.position, bulletSpawn2.rotation);
					audio2.clip = shotSound2;
					audio2.Play();
					
					shootingTimer = secondsBetween;
					
				}
			}
	}
}

function OnTriggerEnter(other : Collider)
{	
	//when bullet hits the enemy, destroy enemy,animate explosion
	if(other.tag == "Torpedo")
	{
		if(hitsToDestroyShield > 0)
		{
				hitsToDestroyShield--;
				var z : float = transform.position.z - 10;
				var pos1 : Vector3 = new Vector3(other.transform.position.x,other.transform.position.y, z);
				Instantiate(shieldEffect,pos1, other.transform.rotation);		
				//change shield bar
				shieldBar.transform.localScale += new Vector3(0.025f , 0.0f , 0.0f );

		}
		else
		{
				hitsToDestroyBoss--;

				shieldBar.transform.localScale = new Vector3(0.0f , 0.0f , 0.0f );

				audio6.clip = explosionSound;
				audio6.Play();
			
				Instantiate(explosion,other.transform.position, other.transform.rotation);
				
				//change health bar
				healthBar.transform.localScale += new Vector3(0.025f , 0.0f , 0.0f );
				
				PlayerShip.points += 300;//change number of points
				
				//boss destroyed
				if(hitsToDestroyBoss <= 0)
				{
					healthBar.transform.localScale = new Vector3(0.0f , 0.0f , 0.0f );
				
					//prevents boss from shooting when game over 
					secondsBetween = 100;
				
					//animate ending explosions
					var pos : Vector3 = other.transform.position;
					var i : int;
					for(i = 1; i < 3; i++)
					{
						other.transform.position.x += i;
						Instantiate(explosion,other.transform.position, other.transform.rotation);
						Instantiate(flame,other.transform.position, other.transform.rotation);
						
						pos.x -= i;
						Instantiate(explosion,pos, other.transform.rotation);
						Instantiate(flame,pos, other.transform.rotation);
						
						audio6.clip = explosionSound;
						audio6.Play();
					}
					
					//show score when boss is destroyed
					Instantiate(score,score.transform.position, score.transform.rotation);
					
					//disable player script, prevents from moving when boss destroyed
					if(player != null)
					{
						player.GetComponent.<BoxCollider>().enabled = false;
						player.GetComponent.<PlayerShip>().enabled = false;
					}
											
				}
				//Destroy(gameObject,audio6.clip.length);
		}
	}

}