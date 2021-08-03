import React from 'react'
import '../css/image.css'
import { SRLWrapper, Lightbox } from 'simple-react-lightbox';
export default function Galery() {
     const images=[{'id':'1','imageName':'house_17.jpeg','tag':"family_house",'alt':"her gece böyle olsun"},
                   {'id':'2','imageName':'house_18.jpeg','tag':"real_house",'alt':"kirmizi motor aldin mi"},
                   {'id':'3','imageName':'house_19.jpeg','tag':"mamudo_gurban",'alt':"kaca aldiysan ucuza almissin"},
                   {'id':'4','imageName':'house_20.jpeg','tag':"niye_dogdun",'alt':"yar üstüne yar sevmissin dayanamiyom"},
                   {'id':'5','imageName':'house_21.jpeg','tag':"kim_okuyup",'alt':"Bir bidonda benzin var"},
    
    ]
     const photos=[{'src': '/images/house_17.jpeg','title': 'image title','description': 'image description'},
     {'src': '/images/house_18.jpeg','title': 'image title','description': 'image description'},]
    return (
        <SRLWrapper>
        <div className='image-container'>
            {images.map((image,index)=>{
                
               return (<div key={index} className="image-card">
               <img className='image' src={`/images/${image.imageName}`} alt={image.alt} />
               </div>)
                
            })}
            
        </div>
        </SRLWrapper>
    )
}
