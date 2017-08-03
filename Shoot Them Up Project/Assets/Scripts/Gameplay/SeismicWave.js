var seismicCharge : GameObject;
var seismicChargeP2 : GameObject;
var audio1 : AudioSource;
var explosionSound : AudioClip;
var WaveSize : float = 20;
var WaveDistance : float = 20;

function Start()
{
	audio1.clip = explosionSound;

}

function Update () 
{	
	if(transform.position.z >= WaveDistance)
	{
		seismicCharge.transform.localScale = new Vector3(0.0f, 0.0f, 0.0f);//capsule
		seismicChargeP2.transform.localScale = new Vector3(0.0f, 0.0f, 0.0f);//capsule
		
		if(transform.localScale.x < WaveSize)
		{
			audio1.Play();
			transform.localScale += new Vector3(0.5f, 0.0f, 0.5f);
		}
		else if(transform.localScale.x >= WaveSize)
		{
			Destroy(gameObject);
		}
	}
	else
	{
		seismicCharge.transform.position.z += 0.1;//capsule
		seismicChargeP2.transform.position.z += 0.1;//capsule
		transform.position.z += 1;
	}
}