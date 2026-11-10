# Inlines img/* as data URIs so the single-file mockup can be published as an Artifact.
import re,base64,mimetypes,os,sys
here=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(here,'index.html'),encoding='utf8').read()
def sub(m):
    p=os.path.join(here,'img',m.group(1))
    mt=mimetypes.guess_type(p)[0]
    return 'data:%s;base64,%s'%(mt,base64.b64encode(open(p,'rb').read()).decode())
out=re.sub(r'(?<=")img/([\w.-]+)',sub,src)
dst=sys.argv[1]
open(dst,'w',encoding='utf8').write(out)
print(len(out)//1024,'KB ->',dst)
