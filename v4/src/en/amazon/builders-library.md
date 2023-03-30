---
title: The Amazon Builders' Library is good
---
# The Amazon Builders' Library is good

[The Amazon Builders' Library](https://aws.amazon.com/builders-library/) is good! Here are some of my favorites.


## [Avoiding fallback in distributed systems](https://aws.amazon.com/builders-library/avoiding-fallback-in-distributed-systems/)

My main take is, executing a less-executed code path is bad, especially when you are already in trouble.

> Not only might the fallback strategy make the problem worse, this will likely occur as a latent bug. It is easy to develop fallback strategies that rarely trigger in production.
>
> ...
>
> Distributed fallback strategies often have latent bugs that show up only when an unlikely set of coincidences occur, potentially months or years after their introduction.

## [Avoiding overload in distributed systems by putting the smaller service in control](https://aws.amazon.com/builders-library/avoiding-overload-in-distributed-systems-by-putting-the-smaller-service-in-control/)

> The simplicity of this architecture gives it inherent availability advantages. However, at Amazon we have also learned that when the scale of the data plane fleet exceeds the scale of the control plane fleet by a factor of 100 or more, this type of distributed system requires careful fine-tuning to avoid the risk of overload.

So don't do that.


## [Avoiding insurmountable queue backlogs](https://aws.amazon.com/builders-library/avoiding-insurmountable-queue-backlogs/)

> *Real time systems often are implemented with FIFO-ish queues, but prefer LIFO-ish behavior.* We hear from our customers that when faced with a backlog, they prefer to see their fresh data processed immediately. Any data accumulated during an outage or surge can then be processed as capacity is available.
