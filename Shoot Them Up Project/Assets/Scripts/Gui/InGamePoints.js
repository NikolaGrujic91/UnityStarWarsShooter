function Update () 
{
	//change 3d text dinamicaly
	GetComponent.<TextMesh>().text = PlayerShip.points.ToString();

}