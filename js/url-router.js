const urlPageTitle = "SPA Router";

document.addEventListener("click", (e)=>{
    const {target} = e;
    if (!target.matches("nav a")) {
        return;
    } 

    e.preventDefault();

    urlRoute();
});


const urlRoutes = {
    404:{
        template:"/templates/404.html",
        title:"404 | " + urlPageTitle,
        description: "Page Not Found"
    },
    "/": {
		template: "/templates/index.html",
		title: "Home | " + urlPageTitle,
		description: "This is the home page",
	},
	"/about": {
		template: "/templates/about.html",
		title: "About Us | " + urlPageTitle,
		description: "This is the about page",
	},
	"/contact": {
		template: "/templates/contact.html",
		title: "Contact Us | " + urlPageTitle,
		description: "This is the contact page",
	},
};


const urlRoute = (event)=>{
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({},"", event.target.href);

    urlLocationHandler();
}


const urlLocationHandler = async ()=>{
    // const location = window.location.pathname;
    const location = window.location.hash.slice(1) || "/";

    if (location.length == 0) {
        location = "/";
    }

    const route = urlRoutes[location] || urlRoutes["404"];

    const html = await fetch(route.template).then((response)=> response.text());
    document.getElementById("content").innerHTML = html;

    document.title = route.title;
    document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
}

window.addEventListener("hashchange", urlLocationHandler);
window.addEventListener("load", urlLocationHandler);

urlLocationHandler();

