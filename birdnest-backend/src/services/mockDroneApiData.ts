const mockDroneApiData = `
<report>
  <deviceInformation deviceId="GUARDB1RD">
    <listenRange>500000</listenRange>
    <deviceStarted>2023-01-17T22:07:24.843Z</deviceStarted>
    <uptimeSeconds>7797</uptimeSeconds>
    <updateIntervalMs>2000</updateIntervalMs>
  </deviceInformation>
  <capture snapshotTimestamp="2023-01-18T00:17:22.233Z">
    <drone>
      <serialNumber>test-serial-1</serialNumber>
      <model>HRP-DRP 1 S</model>
      <manufacturer>ProDröne Ltd</manufacturer>
      <mac>b4:38:d3:80:3d:7c</mac>
      <ipv4>223.114.185.127</ipv4>
      <ipv6>5b45:5fbc:6c4e:5336:461a:72ad:0a01:74c9</ipv6>
      <firmware>7.9.5</firmware>
      <positionY>300000</positionY>
      <positionX>400000</positionX>
      <altitude>4630.195564911774</altitude>
    </drone>
    <drone>
      <serialNumber>test-serial-2</serialNumber>
      <model>HRP-DRP 1 Pro</model>
      <manufacturer>ProDröne Ltd</manufacturer>
      <mac>27:43:c7:e0:db:3f</mac>
      <ipv4>192.138.96.86</ipv4>
      <ipv6>c4dd:2b8c:6872:22c7:b608:e913:e28b:4f98</ipv6>
      <firmware>7.1.1</firmware>
      <positionY>300000</positionY>
      <positionX>300000</positionX>
      <altitude>4182.664703627297</altitude>
    </drone>
    <drone>
      <serialNumber>test-serial-3</serialNumber>
      <model>HRP-DRP 1</model>
      <manufacturer>ProDröne Ltd</manufacturer>
      <mac>84:b3:ac:0c:e7:d6</mac>
      <ipv4>55.166.170.40</ipv4>
      <ipv6>19cf:7803:925d:b04c:e0fb:3b02:0f66:8bb1</ipv6>
      <firmware>0.9.2</firmware>
      <positionY>500000</positionY>
      <positionX>400000</positionX>
      <altitude>4215.6324054313545</altitude>
    </drone>
    <drone>
      <serialNumber>test-serial-4</serialNumber>
      <model>HRP-DRP 1</model>
      <manufacturer>ProDröne Ltd</manufacturer>
      <mac>58:0c:3d:f5:29:af</mac>
      <ipv4>76.91.1.182</ipv4>
      <ipv6>bc40:9c16:86b6:111d:1b74:28b7:a7b1:4ed2</ipv6>
      <firmware>9.3.0</firmware>
      <positionY>200000</positionY>
      <positionX>220000</positionX>
      <altitude>4461.026243846266</altitude>
    </drone>
    <drone>
      <serialNumber>test-serial-5</serialNumber>
      <model>HRP-DRP 1 Pro</model>
      <manufacturer>ProDröne Ltd</manufacturer>
      <mac>3a:56:34:f6:e7:97</mac>
      <ipv4>66.124.186.95</ipv4>
      <ipv6>785c:a294:ebcb:d9ad:370f:0097:280b:d172</ipv6>
      <firmware>3.3.0</firmware>
      <positionY>350000</positionY>
      <positionX>280000</positionX>
      <altitude>4636.570678907595</altitude>
    </drone>
  </capture>
</report>
`;

export default mockDroneApiData;
