<?php

// Define variables
$verb = "GET";

$access_token = "ccd086281e05c0fa988c225ae6a96fa3fdf20174"; //You'll need to follow the example above to get an access token.

$http_headers = array("Authorization: Bearer ".$access_token);

 // Set up the cURL request
$curl = curl_init("https://api.freelancehunt.com/v2/projects");
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $verb);
curl_setopt($curl, CURLOPT_HTTPHEADER, $http_headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HEADER, true);

// This fires the cURL request
$response = curl_exec($curl);

if($response === false){
    // if the curl_exec() fails for reason, it means it could not even reach the aWhere server
    // and the function returns FALSE
    echo 'cURL Transport Error (HTTP request failed): '.curl_error($curl);
    die();
} else {
    // curl_getinfo() returns information about the HTTP transaction, used
    // mainly here for getting the status code.
    $info = curl_getinfo($curl);
    $httpStatusCode = $info['http_code'];

    //The cURL settings above will include the HTTP headers in the response
    //This next command explodes the headers into one variable and the actual API response in another
    list($responseHeaders, $responseBody) = explode("\r\n\r\n", $response, 2);

    //Finally, we use json_decode to transform the API response into a native PHP object.
    print_r($responseBody);
}
curl_close($curl);