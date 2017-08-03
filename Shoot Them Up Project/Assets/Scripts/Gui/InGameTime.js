function Update () 
{
	var minutes : int = Time.timeSinceLevelLoad / 60;
	var seconds : int = Time.timeSinceLevelLoad % 60;
	if(seconds < 10)
		GetComponent.<TextMesh>().text = minutes + ":0" + seconds;
	else
		GetComponent.<TextMesh>().text = minutes + ":" + seconds;
}