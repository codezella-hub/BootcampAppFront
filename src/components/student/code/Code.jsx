import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'

const Code = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [languageId, setLanguageId] = useState(54);
  const [stdin, setStdin] = useState('');
  const [result, setResult] = useState(null);
  const [languages] = useState([
    { id: 54, name: 'C++ (GCC 9.2.0)' },
    { id: 71, name: 'Python (3.8.1)' },
    { id: 63, name: 'JavaScript (Node.js 12.14.0)' },
    { id: 62, name: 'Java (OpenJDK 13.0.1)' },
    { id: 51, name: 'C# (Mono 6.6.0.161)' },
  ]);

  const languageTemplates = {
    54: `// Your First C++ Program
#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}`,
    71: `# Your First Python Program
print("Hello, World!")`,
    63: `// Your First JavaScript Program
console.log("Hello, World!");`,
    62: `// Your First Java Program
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    51: `// Your First C# Program
using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello, World!");
    }
}`
  };

  useEffect(() => {
    setSourceCode(languageTemplates[languageId]);
  }, [languageId]);

  const handleCompile = async () => {
    try {
      // Show circular loading modal
      Swal.fire({
        title: 'Compiling Your Code',
        html: `
          <div class="spinner-container">
            <div class="spinner"></div>
          </div>
          <p class="loading-text">Processing your request...</p>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: {
          popup: 'loading-popup',
          title: 'loading-title',
          htmlContainer: 'loading-html'
        },
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch('http://localhost:3000/api/compiler/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: sourceCode,
          stdin: stdin
        })
      });

      const data = await response.json();
      setResult(data);
      
      Swal.close();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Compilation Failed',
        text: error.message,
        confirmButtonColor: '#0d6efd'
      });
      setResult({ error: error.message });
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard-banner-area-wrapper">
      <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main-wrapper">
                                    <h1 className="title">Coding Time</h1>
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">Debug & compile your code</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="crea-te-course-area-start ptb--100">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="create-course-area-main-wrapper-inner">
              <div className="accordion" id="accordionExampls2">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                      Write your Code Here
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse show"
                    aria-labelledby="headingTwo" data-bs-parent="#accordionExampls2">
                    <div className="accordion-body">
                      <h6 className="title">Pick a language</h6>
                      <div className="course-info-video-link">
                        <select
                          className="nice-select"
                          value={languageId}
                          onChange={(e) => setLanguageId(Number(e.target.value))}
                        >
                          {languages.map(lang => (
                            <option key={lang.id} value={lang.id}>
                              {lang.name}
                            </option>
                          ))}
                        </select>
                        <textarea
                          value={sourceCode}
                          onChange={(e) => setSourceCode(e.target.value)}
                          style={{
                            width: '100%',
                            height: '400px',
                            fontFamily: 'monospace',
                            padding: '1rem',
                            marginTop: '1rem',
                            borderRadius: '4px',
                            border: '1px solid #ced4da'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 rts-sticky-column-item">
            <div className="course-upload-tips-wrapper theiaStickySidebar">
              <h5 className="title">Code compile result</h5>
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #ced4da',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                minHeight: '200px'
              }}>
                {result ? (
                  <>
                    <div>Status: {result.status?.description || 'Unknown'}</div>
                    {result.compile_output && (
                      <div style={{ color: '#dc3545', marginTop: '1rem' }}>
                        Compilation Error:\n{result.compile_output}
                      </div>
                    )}
                    {result.stdout && (
                      <div style={{ color: '#28a745', marginTop: '1rem' }}>
                        Output:\n{result.stdout}
                      </div>
                    )}
                    {result.stderr && (
                      <div style={{ color: '#dc3545', marginTop: '1rem' }}>
                        Error:\n{result.stderr}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ color: '#6c757d' }}>Compile results will appear here</div>
                )}
              </div>

              {/* Moved Input and Button here */}
              <div style={{ marginTop: '2rem' }}>
                <h6 className="title">Input (stdin):</h6>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100px',
                    fontFamily: 'monospace',
                    padding: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #ced4da',
                    marginBottom: '1rem'
                  }}
                />

                <div className="row">
                  <div className="col-lg-12">
                    <div className="preview-course-button-area">
                      <button onClick={handleCompile} type="submit" className="rts-btn btn-border">Compile & Run <i className="fa-light fa-arrow-right" /></button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  
  );
};

export default Code;