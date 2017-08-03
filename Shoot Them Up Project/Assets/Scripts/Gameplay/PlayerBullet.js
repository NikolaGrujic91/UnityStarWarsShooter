var bulletSpeed : float = 25;
var countDownTimer : float = 5;

function Update () 
{
	//moving bullet forward
	transform.position.z += bulletSpeed * Time.deltaTime;
	
	//destroy bullet after 5 seconds
	countDownTimer -= Time.deltaTime;
	if(countDownTimer <= 0)
		Destroy(gameObject);
}

function OnTriggerEnter(other : Collider)
{
	if(other.tag == "Enemy")//destroy bullet after hitting enemy
	{
			Destroy(gameObject);//bullet
	}


}