# Builds a variant into one self-contained file: inlines img/*, shared/fx.css, shared/fx.js.
# usage: python build2.py <variant.html> <output.html>
import re,base64,mimetypes,os,sys
here=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(here,sys.argv[1]),encoding='utf8').read()
rd=lambda p:open(os.path.join(here,p),encoding='utf8').read()
src=src.replace('<link rel="stylesheet" href="shared/fx.css">','<style>'+rd('shared/fx.css')+'</style>')
src=src.replace('<script src="shared/fx.js"></script>','<script>'+rd('shared/fx.js')+'</script>')
def sub(m):
    p=os.path.join(here,'img',m.group(1))
    return 'data:%s;base64,%s'%(mimetypes.guess_type(p)[0],base64.b64encode(open(p,'rb').read()).decode())
out=re.sub(r'''(?<=["'])img/([\w.-]+)''',sub,src)
open(sys.argv[2],'w',encoding='utf8').write(out)
print(len(out)//1024,'KB ->',sys.argv[2])
