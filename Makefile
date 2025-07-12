compile_library:
	cd $(GOPATH)/src/github.com/marianogappa/truco && \
	TINYGOROOT=/usr/local/Cellar/tinygo/0.38.0 tinygo build -o main.wasm -target wasm main_wasm.go && \
	mv main.wasm $(CURDIR)/public/wasm/wasm.wasm && \
	cp /usr/local/Cellar/tinygo/0.38.0/targets/wasm_exec.js $(CURDIR)/public/wasm/wasm_exec.js && \
	cd -
