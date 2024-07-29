import { useEffect, useState } from "react";
import Person from '../Component/Person';
import DisplayBox from "../Component/DisplayBox";
import { useParams } from "react-router-dom";

function Home() {
    const [products, setProduct] = useState([]);
    const [limit, setLimit] = useState(40);
    const[page, setpage] = useState(0);
    const [totleproduct,setTotleproduct] =useState(0);
    const { slug } = useParams();

    const getproduct = async () => {
        console.log(slug);
        let response;

        // if (slug == null) {
        //     response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
        //     response = await fetch(`https://dummyjson.com/products?skip=${30 * page}`);
        // } else {
        //     response = await fetch(`https://dummyjson.com/products/category/${slug}`);
        // }

        if (slug == null) {
            response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page * 30}`);
        } else {
            response = await fetch(`https://dummyjson.com/products/category/${slug}?limit=${limit}&skip=${page * limit}`);
        }


        const data = await response.json();
        setProduct(data.products);
        setTotleproduct(data.total);
    }

    const getlimit = () => {
        setLimit(limit + 20);
    }

    useEffect(() => {
        getproduct();
    }, [slug, limit,page]);

    useEffect(() => {
        document.title = 'Products box';
    }, []);

    const display = products.map((Prod) => {
        return <Person key={Prod.id} img={Prod.thumbnail} name={Prod.title} rating={Prod.rating} />;
    });

    var paginet =[];
    for (var i =0; i< Math.ceil(totleproduct / 30); i++){
        paginet.push(i)
    }

    console.log(display);

    return (
        <div className='container-md'>
            <div className="row border">
                
                <div className="col-3">
                    <DisplayBox currentSlug={slug} />
                </div>
                <div className="col-9 px-5 mt-5">
                    <div className="input-group flex-nowrap">
                           
                           <input
                             type="text"
                             className="form-control"
                             placeholder="Search Product"
                             aria-label="Username"
                             aria-describedby="addon-wrapping"
                           />
                    </div>
          <br />
                <div>
                     {/* page1 1 */}
                     <nav aria-label="Page navigation example ">
                        <ul className="pagination">
                          <li className="page-item"  onClick={()=>setpage(page - 1)}>
                            <a className="page-link" href="#" aria-label="Previous">
                              <span aria-hidden="true">«</span>
                            </a>
                          </li>
                             {
                              paginet.map(
                                  (p)=>{
                                return    <li key={p}  className={`page-item ${page == p && 'active'}`} onClick={()=>setpage(p)}>
                                      <a className="page-link" href="#">
                                        {p + 1}
                                      </a>
                                    </li>
                      
                                        }
                                     )
                             }
   
      
                                <li className="page-item" onClick={()=>setpage(page + 1)}>
                                  <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                  </a>
                                </li>
                        </ul>
                     </nav>
                          

                {/* page end */}
                </div>  
                    <div className="row gap-3">
                        {display}
                    </div>
                    <div onClick={getlimit} className="mt-4 d-flex justify-content-center">
                        <div className="btn btn-primary text-white p-2" style={{ width: 100 }}>
                            see more
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
