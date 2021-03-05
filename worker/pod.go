package main

import (
        "context"
        "fmt"
	"strconv"
	"encoding/json"

//        metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
        "k8s.io/client-go/kubernetes"
        "k8s.io/client-go/rest"
        appsv1 "k8s.io/api/apps/v1"
        apiv1 "k8s.io/api/core/v1"
//	coreV1 "k8s.io/api/core/v1"
//	"k8s.io/apimachinery/pkg/util/intstr"

//        CreateOptions "k8s.io/apimachinery/pkg/apis/meta/v1"
//        Deployment "k8s.io/api/apps/v1"
        //
        // Uncomment to load all auth plugins
        // _ "k8s.io/client-go/plugin/pkg/client/auth"
        //
        // Or uncomment to load specific auth plugins
        // _ "k8s.io/client-go/plugin/pkg/client/auth/azure"
        // _ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
        // _ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
        // _ "k8s.io/client-go/plugin/pkg/client/auth/openstack"
)

type pod struct{}

func (p *pod) pod(dockerImage string, port string, adminCfg []interface{}) (string, error){
	
	// prepare the configuration for a docker container, host mode for the container network
        evs := make([]string, 0)
        evs = append(evs, fmt.Sprintf("myport=%s", port))
        fmt.Println("************005**********")

        // pass the initial configuration as the environmental variable
        jsonString, _ := json.Marshal(adminCfg)
        evs = append(evs, fmt.Sprintf("adminCfg=%s", jsonString))
	fmt.Println("************evs is**********",evs,jsonString)
	fmt.Println("************adminCfg is**********",adminCfg)

	// creates the in-cluster config
        fmt.Println("******inside pod.go**********") 
	config, err := rest.InClusterConfig()
        if err != nil {
                panic(err.Error())
        }

	iport, err := strconv.ParseInt(port, 10, 32);
	fmt.Println("******numeric port val is**********",iport) 	
	pport := int32(iport)	
	if err != nil {
                panic(err.Error())
        }

        // creates the clientset
	fmt.Println("******port num is**********",iport)
        clientset, err := kubernetes.NewForConfig(config)
        if err != nil {
                panic(err.Error())
        }

                deploymentsClient := clientset.AppsV1().Deployments(apiv1.NamespaceDefault)

        deployment := &appsv1.Deployment{
                ObjectMeta: metav1.ObjectMeta{
                        Name: "fogflow-deployment" + port,
                },
                Spec: appsv1.DeploymentSpec{
                        Selector: &metav1.LabelSelector{
                                MatchLabels: map[string]string{
                                        "app": "demo",
                                },
                        },
                        Template: apiv1.PodTemplateSpec{
                                ObjectMeta: metav1.ObjectMeta{
                                        Labels: map[string]string{
                                                "app": "demo",
                                        },
                                },
                                Spec: apiv1.PodSpec{
                                        Containers: []apiv1.Container{
                                                {
                                                        Name:  "web",
                                                        Image: dockerImage,
                                                        Ports: []apiv1.ContainerPort{
                                                                {
                                                                        Name:          "http",
                                                                        Protocol:      apiv1.ProtocolTCP,
                                                                        ContainerPort: pport,
									HostPort:      pport,	
                                                                },
                                                        },
							Env: []apiv1.EnvVar{
							      {
									Name: "adminCfg",
									Value: "{{evs.adminCfg}}",
								},
							},
							Command:         []string{fmt.Sprintf("adminCfg=%s", evs)},
							//Args:            []string{"evs"},
								
                                                },
                                        },
                                },
                        },
                },
        }
	
        // Create Deployment
        fmt.Println("Creating deployment...")
        result, err := deploymentsClient.Create(context.TODO(), deployment, metav1.CreateOptions{})
        if err != nil {
                panic(err)
        }
        fmt.Printf("Created deployment %q.\n", result.GetObjectMeta().GetName())
//	return result.GetObjectMeta().GetName(), err


/*	// Specification of the Service (k8s.io/api/core/v1)

	coreV1Client := clientset.CoreV1()

	serviceSpec := &coreV1.Service{
		ObjectMeta: metaV1.ObjectMeta{
			Name: "fogflow-deployment" + port,
		},
		Spec: coreV1.ServiceSpec{
			Selector: map[string]string{
				"app": "demo",
			},
			Type: "LoadBalancer",
			Ports: []coreV1.ServicePort{
				{
					Port: pport,
					TargetPort: intstr.IntOrString{
						Type:   intstr.Int,
						IntVal: pport,
					},
				},
			},
		},
	}

	service, err := coreV1Client.Services(apiv1.NamespaceDefault).Create(context.TODO(), serviceSpec, metaV1.CreateOptions{})
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created service %s\n", service.ObjectMeta.Name)
*/

	return result.GetObjectMeta().GetName(), err
}

