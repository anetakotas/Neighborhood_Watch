fetch("/announcements.json")
            .then((response) => response.json())
            .then(function(data) {
                console.log(Object.keys(data['announcements']).length);

                var tb = document.getElementById('tb');
                var pos = [];

                for(var i = 0; i < Object.keys(data['announcements']).length; i++) {
                    
                    pos.push(data.announcements[i].title);
                    var tr = document.createElement('tr');
                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');
                    var td3 = document.createElement('td');
                    var td4 = document.createElement('td');
                    var td5 = document.createElement('td');
                    var a1td = document.createElement('a');
                    var spantd = document.createElement('span');
                    var a4td = document.createElement('a');
                    var a5td = document.createElement('a');

                    a1td.href = 'javascript:void(0)';
                    a4td.className = 'avatar';
                    a5td.className = 'menu';
                    a1td.id = i;

                    a1td.addEventListener("click", function() {
                        
                        var overlay = document.createElement('div');
                        var message = document.createElement('div');
                        var h3 = document.createElement('h3');
                        var p = document.createElement('p');
                        var table = document.getElementById('tb');
                        var closeButton = document.createElement('a');

                        overlay.id = 'overlay';
                        message.id = 'message';
                        closeButton.href = 'javascript:void(0)';
                        closeButton.id = 'closeButton';
                        
                        console.log(this.id);
                       
                        console.log(data.announcements[this.id]);

                        h3.innerHTML = data.announcements[this.id].title;
                        p.innerHTML = data.announcements[this.id].description;


                        closeButton.innerHTML = 'X';
                        closeButton.style.textDecoration = 'none';
                        closeButton.onclick = close;

                        message.appendChild(closeButton);
                        message.appendChild(h3);
                        message.appendChild(p);
                        
                        overlay.appendChild(message);
                        
                        table.appendChild(overlay);
                        document.getElementById('overlay').style.visibility = 'visible';
                    });

                    a1td.innerHTML = data.announcements[i].title;
                    td2.innerHTML = data.announcements[i].category;
                    spantd.innerHTML = data.announcements[i].date;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    td1.appendChild(a1td);
                    td3.appendChild(spantd);
                    td4.appendChild(a4td);
                    td5.appendChild(a5td);


                    tb.appendChild(tr);
                }
                console.log(pos);

                function close() {
                    document.getElementById('overlay').style.visibility = 'hidden';
                    document.getElementById('overlay').remove();
                }
            });

            const fs = require('fs');

            var dataBefore = require('./announcements.json');

            document.getElementById('submitAnnouncement').addEventListener('submit', async function(event) {

                var title, category, context;

                title = document.getElementById('title').value;
                category = document.getElementById('category').value;
                content = document.getElementById('content').value;

                var newObject = {
                    title,
                    category,
                    content
                };

                var response = await fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newObject)
                });
            });
