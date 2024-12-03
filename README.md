# **CodeSlide: Interactive Python Slides with Code-Server**

CodeSlide combines **remark.js** for Markdown-based slides with **Code-Server** (VS Code in the browser) to create an interactive environment for presenting and live coding. It’s a self-contained solution for educators, developers, and presenters to showcase code and ideas seamlessly.

---

## **Features**
- Create and present slides using **remark.js**.
- Run Python code live within the presentation using an embedded **Code-Server** instance.
- Serve slides and live coding environments via a lightweight web server.
- Pre-installed Python and tools for coding.
- Customizable slide styles with **CSS**.
- Dockerized for portability and ease of use.

---

## **Project Structure**
```
CodeSlide/
├── Dockerfile          # Custom Dockerfile for CodeSlide
├── requirements.txt    # Python dependencies for the environment (if needed)
├── slides/             # Contains Markdown slides and related resources
│   ├── presentation.md # Main slides file
│   ├── style.css       # Custom styles for remark.js slides
│   ├── code/           # Code files referenced in slides
│   │   └── example.py  # Example Python code
├── .config/            # Optional: Code-Server config folder
│   └── config.yaml     # Configuration file for Code-Server
├── README.md           # Documentation for the project
```

---

## **Setup**

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd CodeSlide
```

### **2. Build the Docker Image**
Build the Docker image to include Code-Server, Python, and a web server:
```bash
docker build -t codeslide .
```

### **3. Run the Docker Container**
Run the container, exposing both the slide server and Code-Server:
```bash
docker run -d -p 80:80 -p 8080:8080 -v "$(pwd):/home/coder/project" codeslide
```

---

## **Usage**

### **Access Services**
- **Slides**: [http://localhost](http://localhost) (served by Nginx or another web server on port 80).
- **Code-Server**: [http://localhost:8080](http://localhost:8080) (development environment for live coding).

### **Create and Edit Slides**
1. Edit the `slides/presentation.md` file to create or update slides.
2. Add Python code files to `slides/code/` and reference them in your slides.

### **Embed Live Coding in Slides**
You can embed Code-Server directly into your slides using an iframe. Example:
```markdown
# Live Coding Example

~~~python
# slides/code/example.py
print("Hello, world!")
~~~~

<iframe src="http://localhost:8080/?folder=/home/coder/project/slides/code&open=file://example.py" width="100%" height="200px"></iframe>
```

---

## **Customizing Slides**
- Use `slides/presentation.md` to define your content.
- Add styles in `slides/style.css` to change the appearance of your slides.

---

## **Known Limitations**
- **Local Environment**: Designed for local use. For remote access, additional configuration (e.g., Ngrok) is needed.
- **Persistent Configuration**: To persist configurations, mount a local folder for the `.config` directory or include it in the Dockerfile.

---

## **Contributing**
Contributions to CodeSlide are welcome! Feel free to open issues or submit pull requests.

---

## **License**
CodeSlide is open-source and available under the [MIT License](LICENSE).
