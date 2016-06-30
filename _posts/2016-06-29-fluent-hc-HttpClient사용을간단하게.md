---
layout: post
title: fluent-hc - HttpClient 사용을 간단하게!
---

[fluent-hc](http://hc.apache.org/httpcomponents-client-4.3.x/fluent-hc/dependency-info.html) 라이브러리는 apache http components 사용을 간편하게 해주는 facade API 라이브러리 이다.

소스코드를 열어보면(버전 4.3.2 기준으로) 8개 클래스만이 존재하는 아주 심플한 라이브러리이지만 제공해주는 기능은 아주 편리하다.

우리가 아파치 HttpClient를 사용하는 대부분은 request를 날려서 response를 받아오는 기능의 사용이다. HttpClient가 많은 기능을 제공하긴 하지만 위의 목적으로만 사용하길 원할때는 사용하기 복잡하고 신경써줘야 하는게 많다. 하지만 fluent-hc 라이브러리를 사용하면 아주 직관적인 코드 몇 줄 만으로 원하는 기능을 사용할 수 있다.

[slf4j](http://www.slf4j.org) 라이브러리와 함께 facade 패턴을 참고할 만한 좋은 라이브러라고 생각된다.

```java
public class Form {
    private final List params;

    public static Form form() {
        return new Form();
    }

    Form() {
        super();
        this.params = new ArrayList();
    }

    public Form add(final String name, final String value) {
        this.params.add(new BasicNameValuePair(name, value));
    }

    public List build() {
        return new ArrayList(this.params);
    }
}
```
