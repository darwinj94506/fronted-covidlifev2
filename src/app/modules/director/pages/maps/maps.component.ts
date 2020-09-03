import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MainFacade } from '../../../../store/facade';
import { EstadisticasFacade } from '../../store/estadisticas.facade';
import { MapasDatosIn } from '../../../../core/domain/inputs';
import { EstadisticaTipoEnum, DiagnosticoActualEnum } from '../../../../core/domain/enums';
import { MapasPacientesPorDiagnosticoOut } from '../../../../core/domain/outputs';
import { SeguimientoMapsOut } from 'src/app/core/domain/outputs/seguimiento-maps.out';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements AfterViewInit, OnInit {
hospital;
coordenadasPorDiagnostico: MapasPacientesPorDiagnosticoOut[] = [];
map: google.maps.Map;
heatmap: google.maps.visualization.HeatmapLayer;
@ViewChild('mapWrapper', {static: false}) mapElement: ElementRef;

constructor( private _mainFacade: MainFacade,
             private _estadisticaFacade: EstadisticasFacade){
}

ngAfterViewInit() {
  this.initMap();
}

ngOnInit(){
  this._estadisticaFacade.getCoordenadasPorDiagnosticoFromStorage()
    .subscribe(data=>{
      console.log(data);
      this.coordenadasPorDiagnostico = data.mapaPacientesPorDiagnostico;
  })

  this._mainFacade.getHospitalSesion().subscribe(hospital=> {
    this.hospital = hospital;
    let filtro: MapasDatosIn = {
      tipo: EstadisticaTipoEnum.COUNT_PACIENTES_POR_DIAGNOSTICO,
      idHospital: hospital.idHospital._id }
    this._estadisticaFacade.distpachActionLoadCoordenadasPorDiagnostico(filtro)
  })
}
  
initMap(): void {
  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 13,
    center: { lat: -0.929675, lng: -78.605851 },
    mapTypeId: "satellite"
    
  });

  this.heatmap = new google.maps.visualization.HeatmapLayer({
    data: this.getPoints(),
    map: this.map
  });
}


toggleHeatmap() {
  this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
}


// Heatmap data: 500 Points
  getPoints() {
    return [
    
    ];
  }

  confirmados(){
    this.configMap(DiagnosticoActualEnum.CONFIRMADO);
  } 

  sospechosos(){
   this.configMap(DiagnosticoActualEnum.SOSPECHOSO);
  }

  configMap(diagnostico: DiagnosticoActualEnum): void{
    let arrayCoords = this.coordenadasPorDiagnostico.find(item=> item.agrupadoPor.diagnostico_enum === diagnostico);
    let gMCoords = []
    let bounds  = new google.maps.LatLngBounds();
    arrayCoords.contador.forEach(item=>{
      if(item.latitud!=null && item.longitud!=null){
        let coord = new google.maps.LatLng(item.latitud, item.longitud);
        bounds.extend(coord);
        gMCoords.push(coord);
      }
    })
    if (gMCoords.length >0 ){
      this.map.fitBounds(bounds);          
      this.map.panToBounds(bounds);   
      this.setMap([...gMCoords])
    } else {
      // si no existen coordenadas
      let coordenada = new google.maps.LatLng(-0.929675, -78.605851)
      bounds.extend(coordenada);
      this.map.fitBounds(bounds);  
      this.map.setZoom(13);              
    }
  }

  recuperados(){
    this.configMap(DiagnosticoActualEnum.RECUPERADO);
  }

  fallecidos(){
    this.configMap(DiagnosticoActualEnum.FALLECIDO);
  }

  hospitalizados(){
    this.configMap(DiagnosticoActualEnum.HOSPITALIZADO);
  }

  setMap(data: google.maps.LatLng[]){
    this.heatmap.setData(data);
  }
  
}



const CONFIRMADOS = [
  new google.maps.LatLng(37.787217, -122.416715),
  new google.maps.LatLng(37.786144, -122.416403),
  new google.maps.LatLng(37.785292, -122.416257),
  new google.maps.LatLng(37.780666, -122.390374),
  new google.maps.LatLng(37.780501, -122.391281),
  new google.maps.LatLng(37.780148, -122.392052),
  new google.maps.LatLng(37.780173, -122.391148),
  new google.maps.LatLng(37.780693, -122.390592),
  new google.maps.LatLng(37.781261, -122.391142),
  new google.maps.LatLng(37.781808, -122.39173),
  new google.maps.LatLng(37.78234, -122.392341),
  new google.maps.LatLng(37.782812, -122.393022),
  new google.maps.LatLng(37.7833, -122.393672),
  new google.maps.LatLng(37.783809, -122.394275),
  new google.maps.LatLng(37.784246, -122.394979),
  new google.maps.LatLng(37.784791, -122.395958),
  new google.maps.LatLng(37.785675, -122.396746),
  new google.maps.LatLng(37.786262, -122.39578),
  new google.maps.LatLng(37.786776, -122.395093),
  new google.maps.LatLng(37.787282, -122.394426),
  new google.maps.LatLng(37.787783, -122.393767),
  new google.maps.LatLng(37.788343, -122.393184),
  new google.maps.LatLng(37.788895, -122.392506),
  new google.maps.LatLng(37.789371, -122.391701),
  new google.maps.LatLng(37.789722, -122.390952),
  new google.maps.LatLng(37.790315, -122.390305),
  new google.maps.LatLng(37.790738, -122.389616),
  new google.maps.LatLng(37.779448, -122.438702),
  new google.maps.LatLng(37.779023, -122.438585),
  new google.maps.LatLng(37.778542, -122.438492),
  new google.maps.LatLng(37.7781, -122.438411),
  new google.maps.LatLng(37.777986, -122.438376),
  new google.maps.LatLng(37.77768, -122.438313),
  new google.maps.LatLng(37.777316, -122.438273),
  new google.maps.LatLng(37.777135, -122.438254),
  new google.maps.LatLng(37.776987, -122.438303),
  new google.maps.LatLng(37.776946, -122.438404),
  new google.maps.LatLng(37.776944, -122.438467),
  new google.maps.LatLng(37.776892, -122.438459),
  new google.maps.LatLng(37.776842, -122.438442),
  new google.maps.LatLng(37.776822, -122.438391),
  new google.maps.LatLng(37.776814, -122.438412),
  new google.maps.LatLng(37.776787, -122.438628),
  new google.maps.LatLng(37.776729, -122.43865),
  new google.maps.LatLng(37.776759, -122.438677),
  new google.maps.LatLng(37.776772, -122.438498),
  new google.maps.LatLng(37.776787, -122.438389),
  new google.maps.LatLng(37.776848, -122.438283),
  new google.maps.LatLng(37.77687, -122.438239),
  new google.maps.LatLng(37.777015, -122.438198),
  new google.maps.LatLng(37.777333, -122.438256),
  new google.maps.LatLng(37.777595, -122.438308),
  new google.maps.LatLng(37.777797, -122.438344),
  new google.maps.LatLng(37.77816, -122.438442),
  new google.maps.LatLng(37.778414, -122.438508),
  new google.maps.LatLng(37.778445, -122.438516),
  new google.maps.LatLng(37.778503, -122.438529),
  new google.maps.LatLng(37.778607, -122.438549),
  new google.maps.LatLng(37.77867, -122.438644),
  new google.maps.LatLng(37.778847, -122.438706),
  new google.maps.LatLng(37.77924, -122.438744),
  new google.maps.LatLng(37.779738, -122.438822),
  new google.maps.LatLng(37.780201, -122.438882),
  new google.maps.LatLng(37.7804, -122.438905),
  new google.maps.LatLng(37.780501, -122.438921),
  new google.maps.LatLng(37.780892, -122.438986),
  new google.maps.LatLng(37.781446, -122.439087),
  new google.maps.LatLng(37.781985, -122.439199),
  new google.maps.LatLng(37.782239, -122.439249),
  new google.maps.LatLng(37.782286, -122.439266),
  new google.maps.LatLng(37.797847, -122.429388),
  new google.maps.LatLng(37.797874, -122.42918),
  new google.maps.LatLng(37.797885, -122.429069),
  new google.maps.LatLng(37.797887, -122.42905),
  new google.maps.LatLng(37.797933, -122.428954),
  new google.maps.LatLng(37.798242, -122.42899),
  new google.maps.LatLng(37.798617, -122.429075),
  new google.maps.LatLng(37.798719, -122.429092),
  new google.maps.LatLng(37.798944, -122.429145),
  new google.maps.LatLng(37.79932, -122.429251),
  new google.maps.LatLng(37.79959, -122.429309),
  new google.maps.LatLng(37.799677, -122.429324),
  new google.maps.LatLng(37.799966, -122.42936),
  new google.maps.LatLng(37.800288, -122.42943),
  new google.maps.LatLng(37.800443, -122.429461),
  new google.maps.LatLng(37.800465, -122.429474),
  new google.maps.LatLng(37.800644, -122.42954),
  new google.maps.LatLng(37.800948, -122.42962),
  new google.maps.LatLng(37.801242, -122.429685),
  new google.maps.LatLng(37.801375, -122.429702),
  new google.maps.LatLng(37.8014, -122.429703),
  new google.maps.LatLng(37.801453, -122.429707),
  new google.maps.LatLng(37.801473, -122.429709),
  new google.maps.LatLng(37.801532, -122.429707),
  new google.maps.LatLng(37.801852, -122.429729),
  new google.maps.LatLng(37.802173, -122.429789),
  new google.maps.LatLng(37.802459, -122.429847),
  new google.maps.LatLng(37.802554, -122.429825),
  new google.maps.LatLng(37.802647, -122.429549),
  new google.maps.LatLng(37.802693, -122.429179),
  new google.maps.LatLng(37.802729, -122.428751),
  new google.maps.LatLng(37.766104, -122.409291),
  new google.maps.LatLng(37.766103, -122.409268),
  new google.maps.LatLng(37.766138, -122.409229),
  new google.maps.LatLng(37.766183, -122.409231),
  new google.maps.LatLng(37.766153, -122.409276),
  new google.maps.LatLng(37.766005, -122.409365),
  new google.maps.LatLng(37.765897, -122.40957),
]

const SOSPECHOSOS = [
  new google.maps.LatLng(37.765767, -122.409739),
  new google.maps.LatLng(37.765693, -122.410389),
  new google.maps.LatLng(37.765615, -122.411201),
  new google.maps.LatLng(37.765533, -122.412121),
  new google.maps.LatLng(37.765467, -122.412939),
  new google.maps.LatLng(37.765444, -122.414821),
  new google.maps.LatLng(37.765444, -122.414964),
  new google.maps.LatLng(37.765318, -122.415424),
  new google.maps.LatLng(37.763961, -122.415296),
  new google.maps.LatLng(37.763115, -122.415196),
  new google.maps.LatLng(37.762967, -122.415183),
  new google.maps.LatLng(37.762278, -122.415127),
  new google.maps.LatLng(37.761675, -122.415055),
  new google.maps.LatLng(37.760932, -122.414988),
  new google.maps.LatLng(37.759337, -122.414862),
  new google.maps.LatLng(37.773187, -122.421922),
  new google.maps.LatLng(37.773043, -122.422118),
  new google.maps.LatLng(37.773007, -122.422165),
  new google.maps.LatLng(37.772979, -122.422219),
  new google.maps.LatLng(37.772865, -122.422394),
  new google.maps.LatLng(37.772779, -122.422503),
  new google.maps.LatLng(37.772676, -122.422701),
  new google.maps.LatLng(37.772606, -122.422806),
  new google.maps.LatLng(37.772566, -122.42284),
  new google.maps.LatLng(37.772508, -122.422852),
  new google.maps.LatLng(37.772387, -122.423011),
  new google.maps.LatLng(37.772099, -122.423328),
  new google.maps.LatLng(37.771704, -122.423783),
  new google.maps.LatLng(37.771481, -122.424081),
  new google.maps.LatLng(37.7714, -122.424179),
  new google.maps.LatLng(37.771352, -122.42422),
  new google.maps.LatLng(37.771248, -122.424327),
  new google.maps.LatLng(37.770904, -122.424781),
  new google.maps.LatLng(37.77052, -122.425283),
  new google.maps.LatLng(37.770337, -122.425553),
  new google.maps.LatLng(37.770128, -122.425832),
  new google.maps.LatLng(37.769756, -122.426331),
  new google.maps.LatLng(37.7693, -122.426902),
  new google.maps.LatLng(37.769132, -122.427065),
  new google.maps.LatLng(37.769092, -122.427103),
  new google.maps.LatLng(37.768979, -122.427172),
  new google.maps.LatLng(37.768595, -122.427634),
  new google.maps.LatLng(37.768372, -122.427913),
  new google.maps.LatLng(37.768337, -122.427961),
  new google.maps.LatLng(37.768244, -122.428138),
  new google.maps.LatLng(37.767942, -122.428581),
  new google.maps.LatLng(37.767482, -122.429094),
  new google.maps.LatLng(37.767031, -122.429606),
  new google.maps.LatLng(37.766732, -122.429986),
  new google.maps.LatLng(37.76668, -122.430058),
  new google.maps.LatLng(37.766633, -122.430109),
  new google.maps.LatLng(37.76658, -122.430211),
  new google.maps.LatLng(37.766367, -122.430594),
  new google.maps.LatLng(37.76591, -122.431137),
  new google.maps.LatLng(37.765353, -122.431806),
  new google.maps.LatLng(37.764962, -122.432298),
  new google.maps.LatLng(37.764868, -122.432486),
  new google.maps.LatLng(37.764518, -122.432913),
  new google.maps.LatLng(37.763435, -122.434173),
  new google.maps.LatLng(37.762847, -122.434953),
  new google.maps.LatLng(37.762291, -122.435935),
  new google.maps.LatLng(37.762224, -122.436074),
  new google.maps.LatLng(37.761957, -122.436892),
  new google.maps.LatLng(37.761652, -122.438886),
  new google.maps.LatLng(37.761284, -122.439955),
  new google.maps.LatLng(37.76121, -122.440068),
  new google.maps.LatLng(37.761064, -122.44072),
  new google.maps.LatLng(37.76104, -122.441411),
  new google.maps.LatLng(37.761048, -122.442324),
  new google.maps.LatLng(37.760851, -122.443118),
  new google.maps.LatLng(37.759977, -122.444591),
  new google.maps.LatLng(37.759913, -122.444698),
  new google.maps.LatLng(37.759623, -122.445065),
  new google.maps.LatLng(37.758902, -122.445158),
  new google.maps.LatLng(37.758428, -122.44457),
  new google.maps.LatLng(37.757687, -122.44334),
  new google.maps.LatLng(37.757583, -122.44324),
  new google.maps.LatLng(37.757019, -122.442787),
  new google.maps.LatLng(37.756603, -122.442322),
  new google.maps.LatLng(37.75638, -122.441602),
  new google.maps.LatLng(37.75579, -122.441382),
  new google.maps.LatLng(37.754493, -122.442133),
  new google.maps.LatLng(37.754361, -122.442206),
  new google.maps.LatLng(37.753719, -122.44265),
  new google.maps.LatLng(37.753096, -122.442915),
  new google.maps.LatLng(37.751617, -122.443211),
  new google.maps.LatLng(37.751496, -122.443246),
  new google.maps.LatLng(37.750733, -122.443428),
  new google.maps.LatLng(37.750126, -122.443536),
  new google.maps.LatLng(37.750103, -122.443784),
  new google.maps.LatLng(37.75039, -122.44401),
  new google.maps.LatLng(37.750448, -122.444013),
  new google.maps.LatLng(37.750536, -122.44404),
  new google.maps.LatLng(37.750493, -122.444141),
  new google.maps.LatLng(37.790859, -122.402808),
  new google.maps.LatLng(37.790864, -122.402768),
  new google.maps.LatLng(37.790995, -122.402539),
  new google.maps.LatLng(37.791148, -122.402172),
  new google.maps.LatLng(37.791385, -122.401312),
  new google.maps.LatLng(37.791405, -122.400776),
  new google.maps.LatLng(37.791288, -122.400528),
  new google.maps.LatLng(37.791113, -122.400441),
  new google.maps.LatLng(37.791027, -122.400395),
  new google.maps.LatLng(37.791094, -122.400311),
  new google.maps.LatLng(37.791211, -122.400183),
  new google.maps.LatLng(37.79106, -122.399334),
  new google.maps.LatLng(37.790538, -122.398718),
  new google.maps.LatLng(37.790095, -122.398086),
  new google.maps.LatLng(37.789644, -122.39736),
  new google.maps.LatLng(37.789254, -122.396844),
  new google.maps.LatLng(37.788855, -122.396397),
  new google.maps.LatLng(37.788483, -122.395963),
  new google.maps.LatLng(37.788015, -122.395365),
  new google.maps.LatLng(37.787558, -122.394735),
  new google.maps.LatLng(37.787472, -122.394323),
  new google.maps.LatLng(37.78763, -122.394025),
  new google.maps.LatLng(37.787767, -122.393987),
  new google.maps.LatLng(37.787486, -122.394452),
  new google.maps.LatLng(37.786977, -122.395043),
  new google.maps.LatLng(37.786583, -122.395552),
  new google.maps.LatLng(37.78654, -122.39561),
  new google.maps.LatLng(37.786516, -122.395659),
  new google.maps.LatLng(37.786378, -122.395707),
  new google.maps.LatLng(37.786044, -122.395362),
  new google.maps.LatLng(37.785598, -122.394715),
  new google.maps.LatLng(37.785321, -122.394361),
  new google.maps.LatLng(37.785207, -122.394236),
  new google.maps.LatLng(37.785751, -122.394062),
  new google.maps.LatLng(37.785996, -122.393881),
  new google.maps.LatLng(37.786092, -122.39383),
  new google.maps.LatLng(37.785998, -122.393899),
  new google.maps.LatLng(37.785114, -122.394365),
  new google.maps.LatLng(37.785022, -122.394441),
  new google.maps.LatLng(37.784823, -122.394635),
  new google.maps.LatLng(37.784719, -122.394629),
  new google.maps.LatLng(37.785069, -122.394176),
  new google.maps.LatLng(37.7855, -122.39365),
  new google.maps.LatLng(37.78577, -122.393291),
  new google.maps.LatLng(37.785839, -122.393159),
  new google.maps.LatLng(37.782651, -122.400628),
  new google.maps.LatLng(37.782616, -122.400599),
  new google.maps.LatLng(37.782702, -122.40047),
  new google.maps.LatLng(37.782915, -122.400192),
  new google.maps.LatLng(37.783137, -122.399887),
  new google.maps.LatLng(37.783414, -122.399519),
  new google.maps.LatLng(37.783629, -122.399237),
  new google.maps.LatLng(37.783688, -122.399157),
  new google.maps.LatLng(37.783716, -122.399106),
  new google.maps.LatLng(37.783798, -122.399072),
  new google.maps.LatLng(37.783997, -122.399186),
  new google.maps.LatLng(37.784271, -122.399538),
  new google.maps.LatLng(37.784577, -122.399948),
  new google.maps.LatLng(37.784828, -122.40026),
  new google.maps.LatLng(37.784999, -122.400477),
  new google.maps.LatLng(37.785113, -122.400651),
  new google.maps.LatLng(37.785155, -122.400703),
  new google.maps.LatLng(37.785192, -122.400749),
  new google.maps.LatLng(37.785278, -122.400839),
  new google.maps.LatLng(37.785387, -122.400857),
  new google.maps.LatLng(37.785478, -122.40089),
  new google.maps.LatLng(37.785526, -122.401022),
  new google.maps.LatLng(37.785598, -122.401148),
  new google.maps.LatLng(37.785631, -122.401202),
  new google.maps.LatLng(37.78566, -122.401267),
  new google.maps.LatLng(37.803986, -122.426035),
  new google.maps.LatLng(37.804102, -122.425089),
  new google.maps.LatLng(37.804211, -122.424156),
  new google.maps.LatLng(37.803861, -122.423385),
  new google.maps.LatLng(37.803151, -122.423214),
  new google.maps.LatLng(37.802439, -122.423077),
  new google.maps.LatLng(37.80174, -122.422905),
  new google.maps.LatLng(37.801069, -122.422785),
  new google.maps.LatLng(37.800345, -122.422649),
  new google.maps.LatLng(37.799633, -122.422603),
  new google.maps.LatLng(37.79975, -122.4217),
  new google.maps.LatLng(37.799885, -122.420854),
  new google.maps.LatLng(37.799209, -122.420607),
  new google.maps.LatLng(37.795656, -122.400395),
  new google.maps.LatLng(37.795203, -122.400304),
  new google.maps.LatLng(37.778738, -122.415584),
  new google.maps.LatLng(37.778812, -122.415189),
  new google.maps.LatLng(37.778824, -122.415092),
  new google.maps.LatLng(37.778833, -122.414932),
  new google.maps.LatLng(37.778834, -122.414898),
  new google.maps.LatLng(37.77874, -122.414757),
  new google.maps.LatLng(37.778501, -122.414433),
  new google.maps.LatLng(37.778182, -122.414026),
  new google.maps.LatLng(37.777851, -122.413623),
  new google.maps.LatLng(37.777486, -122.413166),
  new google.maps.LatLng(37.777109, -122.412674),
  new google.maps.LatLng(37.776743, -122.412186),
  new google.maps.LatLng(37.77644, -122.4118),
  new google.maps.LatLng(37.776295, -122.411614),
  new google.maps.LatLng(37.776158, -122.41144),
  new google.maps.LatLng(37.775806, -122.410997),
  new google.maps.LatLng(37.775422, -122.410484),
  new google.maps.LatLng(37.775126, -122.41008)
]

const RECUPERADOS = [
  new google.maps.LatLng(37.775012, -122.409854),
  new google.maps.LatLng(37.775164, -122.409573),
  new google.maps.LatLng(37.775498, -122.40918),
  new google.maps.LatLng(37.775868, -122.40873),
  new google.maps.LatLng(37.776256, -122.40824),
  new google.maps.LatLng(37.776519, -122.407928),
  new google.maps.LatLng(37.776539, -122.407904),
  new google.maps.LatLng(37.776595, -122.407854),
  new google.maps.LatLng(37.776853, -122.407547),
  new google.maps.LatLng(37.777234, -122.407087),
  new google.maps.LatLng(37.777644, -122.406558),
  new google.maps.LatLng(37.778066, -122.406017),
  new google.maps.LatLng(37.778468, -122.405499),
  new google.maps.LatLng(37.778866, -122.404995),
  new google.maps.LatLng(37.779295, -122.404455),
  new google.maps.LatLng(37.779695, -122.40395),
  new google.maps.LatLng(37.779982, -122.403584),
  new google.maps.LatLng(37.780295, -122.403223),
  new google.maps.LatLng(37.780664, -122.402766),
  new google.maps.LatLng(37.781043, -122.402288),
  new google.maps.LatLng(37.781399, -122.401823),
  new google.maps.LatLng(37.781727, -122.401407),
  new google.maps.LatLng(37.781853, -122.401247),
  new google.maps.LatLng(37.781894, -122.401195),
  new google.maps.LatLng(37.782076, -122.400977),
  new google.maps.LatLng(37.782338, -122.400603),
  new google.maps.LatLng(37.782666, -122.400133),
  new google.maps.LatLng(37.783048, -122.399634),
  new google.maps.LatLng(37.78345, -122.399198),
  new google.maps.LatLng(37.783791, -122.398998),
  new google.maps.LatLng(37.784177, -122.398959),
  new google.maps.LatLng(37.784388, -122.398971),
  new google.maps.LatLng(37.784404, -122.399128),
  new google.maps.LatLng(37.784586, -122.399524),
  new google.maps.LatLng(37.784835, -122.399927),
  new google.maps.LatLng(37.785116, -122.400307),
  new google.maps.LatLng(37.785282, -122.400539),
  new google.maps.LatLng(37.785346, -122.400692),
  new google.maps.LatLng(37.765769, -122.407201),
  new google.maps.LatLng(37.76579, -122.407414),
  new google.maps.LatLng(37.765802, -122.407755),
  new google.maps.LatLng(37.765791, -122.408219),
  new google.maps.LatLng(37.765763, -122.408759),
  new google.maps.LatLng(37.765726, -122.409348),
  new google.maps.LatLng(37.765716, -122.409882),
  new google.maps.LatLng(37.765708, -122.410202),
  new google.maps.LatLng(37.765705, -122.410253),
  new google.maps.LatLng(37.765707, -122.410369),
  new google.maps.LatLng(37.765692, -122.41072),
  new google.maps.LatLng(37.765699, -122.411215),
  new google.maps.LatLng(37.765687, -122.411789),
  new google.maps.LatLng(37.765666, -122.412373),
  new google.maps.LatLng(37.765598, -122.412883),
  new google.maps.LatLng(37.765543, -122.413039),
  new google.maps.LatLng(37.765532, -122.413125),
  new google.maps.LatLng(37.7655, -122.413553),
  new google.maps.LatLng(37.765448, -122.414053),
  new google.maps.LatLng(37.765388, -122.414645),
  new google.maps.LatLng(37.765323, -122.41525),
  new google.maps.LatLng(37.765303, -122.415847),
  new google.maps.LatLng(37.765251, -122.416439),

]

const FALLECIDOS = [
  new google.maps.LatLng(37.77519, -122.412805),
  new google.maps.LatLng(37.774672, -122.413464),
  new google.maps.LatLng(37.774084, -122.414186),
  new google.maps.LatLng(37.773533, -122.413636),
  new google.maps.LatLng(37.773021, -122.413009),
  new google.maps.LatLng(37.772501, -122.412371),
  new google.maps.LatLng(37.771964, -122.411681),
  new google.maps.LatLng(37.771479, -122.411078),
  new google.maps.LatLng(37.770992, -122.410477),
  new google.maps.LatLng(37.770467, -122.409801),
  new google.maps.LatLng(37.77009, -122.408904),
  new google.maps.LatLng(37.769657, -122.408103),
  new google.maps.LatLng(37.769132, -122.407276),
  new google.maps.LatLng(37.768564, -122.406469),
  new google.maps.LatLng(37.76798, -122.405745),
  new google.maps.LatLng(37.76738, -122.405299),
  new google.maps.LatLng(37.766604, -122.405297),
  new google.maps.LatLng(37.765838, -122.4052),
  new google.maps.LatLng(37.765139, -122.405139),
  new google.maps.LatLng(37.764457, -122.405094),
  new google.maps.LatLng(37.763716, -122.405142),
  new google.maps.LatLng(37.762932, -122.405398),
  new google.maps.LatLng(37.762126, -122.405813),
  new google.maps.LatLng(37.761344, -122.406215),
  new google.maps.LatLng(37.760556, -122.406495),
  new google.maps.LatLng(37.759732, -122.406484),
  new google.maps.LatLng(37.75891, -122.406228),
  new google.maps.LatLng(37.758182, -122.405695),
  new google.maps.LatLng(37.757676, -122.405118),
  new google.maps.LatLng(37.757039, -122.404346),
  new google.maps.LatLng(37.756335, -122.403719),
  new google.maps.LatLng(37.755503, -122.403406),
  new google.maps.LatLng(37.754665, -122.403242),
  new google.maps.LatLng(37.753837, -122.403172),
  new google.maps.LatLng(37.752986, -122.403112),
  new google.maps.LatLng(37.751266, -122.403355)

]

const HOSPITALIZADOS = [
  new google.maps.LatLng(37.765204, -122.41702),
  new google.maps.LatLng(37.765172, -122.417556),
  new google.maps.LatLng(37.765164, -122.418075),
  new google.maps.LatLng(37.765153, -122.418618),
  new google.maps.LatLng(37.765136, -122.419112),
  new google.maps.LatLng(37.765129, -122.419378),
  new google.maps.LatLng(37.765119, -122.419481),
  new google.maps.LatLng(37.7651, -122.419852),
  new google.maps.LatLng(37.765083, -122.420349),
  new google.maps.LatLng(37.765045, -122.42093),
  new google.maps.LatLng(37.764992, -122.421481),
  new google.maps.LatLng(37.76498, -122.421695),
  new google.maps.LatLng(37.764993, -122.421843),
  new google.maps.LatLng(37.764986, -122.422255),
  new google.maps.LatLng(37.764975, -122.422823),
  new google.maps.LatLng(37.764939, -122.423411),
  new google.maps.LatLng(37.764902, -122.424014),
  new google.maps.LatLng(37.764853, -122.424576),
  new google.maps.LatLng(37.764826, -122.424922),
  new google.maps.LatLng(37.764796, -122.425375),
  new google.maps.LatLng(37.764782, -122.425869),
  new google.maps.LatLng(37.764768, -122.426089),
  new google.maps.LatLng(37.764766, -122.426117),
  new google.maps.LatLng(37.764723, -122.426276),
  new google.maps.LatLng(37.764681, -122.426649),
  new google.maps.LatLng(37.782012, -122.4042),
  new google.maps.LatLng(37.781574, -122.404911),
  new google.maps.LatLng(37.781055, -122.405597),
  new google.maps.LatLng(37.780479, -122.406341),
  new google.maps.LatLng(37.779996, -122.406939),
  new google.maps.LatLng(37.779459, -122.407613),
  new google.maps.LatLng(37.778953, -122.408228),
  new google.maps.LatLng(37.778409, -122.408839),
  new google.maps.LatLng(37.777842, -122.409501),
  new google.maps.LatLng(37.777334, -122.410181),
  new google.maps.LatLng(37.776809, -122.410836),
  new google.maps.LatLng(37.77624, -122.411514),
  new google.maps.LatLng(37.775725, -122.412145),
]
